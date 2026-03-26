import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { Language, useTranslation } from '@/lib/i18n';
import { reviews, getUserReviews, addUserReview, UserReview } from '@/lib/data';

interface ReviewsSectionProps {
  lang: Language;
}

interface DisplayReview {
  id: string;
  name: string;
  country?: string;
  rating: number;
  text: string;
  isUser?: boolean;
}

export const ReviewsSection = ({ lang }: ReviewsSectionProps) => {
  const t = useTranslation(lang);

  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [form, setForm] = useState({ name: '', comment: '' });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Load any previously submitted reviews on mount
  useEffect(() => {
    setUserReviews(getUserReviews());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError(t.reviews.nameRequired);
      return;
    }
    if (rating < 1) {
      setError(t.reviews.ratingRequired);
      return;
    }
    if (!form.comment.trim()) {
      setError(t.reviews.commentRequired);
      return;
    }

    const newReview = addUserReview({
      name: form.name.trim(),
      rating,
      comment: form.comment.trim(),
    });

    setUserReviews((prev) => [newReview, ...prev]);
    setForm({ name: '', comment: '' });
    setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Combine visitor-submitted reviews (newest first) with the seed reviews
  const displayReviews: DisplayReview[] = [
    ...userReviews.map((r) => ({
      id: r.id,
      name: r.name,
      rating: r.rating,
      text: r.comment,
      isUser: true,
    })),
    ...reviews.map((r) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      rating: r.rating,
      text: r.text[lang],
    })),
  ];

  return (
    <section id="reviews" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t.reviews.title}</h2>
          <p className="text-muted-foreground text-lg">{t.reviews.subtitle}</p>
        </motion.div>

        {/* Write a review form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-14 glass-surface rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-xl font-bold mb-5">{t.reviews.writeReview}</h3>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-6"
              >
                <CheckCircle className="w-12 h-12 text-primary mb-3" strokeWidth={1.5} />
                <p className="font-medium">{t.reviews.thankYou}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t.reviews.namePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />

                <div>
                  <div className="text-sm text-muted-foreground mb-2">{t.reviews.yourRating}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      const filled = value <= (hoverRating || rating);
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 -m-1"
                          aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              filled ? 'text-primary fill-primary' : 'text-muted'
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <textarea
                  placeholder={t.reviews.reviewPlaceholder}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />

                {error && <p className="text-sm text-destructive">{error}</p>}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full gold-gradient text-primary-foreground py-4 rounded-xl font-bold shadow-gold flex items-center justify-center gap-2 transition-all hover:brightness-110"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  {t.reviews.submit}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reviews list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {displayReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-surface rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < review.rating ? 'text-primary fill-primary' : 'text-muted'}`}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="text-foreground/90 mb-4 text-pretty leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm">{review.name}</div>
                  {review.country && <div className="text-xs text-muted-foreground">{review.country}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
