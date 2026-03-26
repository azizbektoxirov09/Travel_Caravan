import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, CalendarIcon, Clock3, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Language, useTranslation } from '@/lib/i18n';
import { Car } from '@/lib/data';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  car: Car | null;
  lang: Language;
  onClose: () => void;
}

// Example booked dates (in production this would come from DB)
const bookedDates = [
  new Date(2026, 2, 22),
  new Date(2026, 2, 23),
  new Date(2026, 2, 24),
  new Date(2026, 2, 28),
  new Date(2026, 3, 1),
  new Date(2026, 3, 5),
];

export const BookingModal = ({ car, lang, onClose }: BookingModalProps) => {
  const t = useTranslation(lang);
  const [form, setForm] = useState({ name: '', phone: '', time: '', people: '1', message: '' });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    setStatus('loading');

    const dateStr = format(selectedDate, 'dd.MM.yyyy');
    const text = `🚗 Websiteban kor\n\n👤 Nomash: ${form.name}\n📞 Tel: ${form.phone}\n📅 Sana: ${dateStr}\n🕐 Vaqt: ${form.time}\n👥 chankas budagesh: ${form.people}\n🚘 Moshin: ${car?.name}\n💰 Narx: $${car?.price}/kun\n💬 Xabar: ${form.message || '—'}`;

    const telegramUrl = `https://t.me/+998907106464?text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');

    setTimeout(() => {
      setStatus('success');
    }, 500);
  };

  const resetAndClose = () => {
    setStatus('idle');
    setForm({ name: '', phone: '', time: '', people: '1', message: '' });
    setSelectedDate(undefined);
    onClose();
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(
      (d) => d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate()
    );
  };

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md glass-surface rounded-3xl p-6 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">{t.booking.title}</h3>
                <p className="text-sm text-muted-foreground">{car.name} — ${car.price}/{t.fleet.perDay}</p>
              </div>
              <button onClick={resetAndClose} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={1.5} />
                  </motion.div>
                  <h4 className="text-xl font-bold mb-2">{t.booking.success}</h4>
                  <p className="text-muted-foreground mb-6">{t.booking.successMsg}</p>
                  <button
                    onClick={resetAndClose}
                    className="px-6 py-3 bg-secondary text-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                  >
                    {t.booking.close}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder={t.booking.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={t.booking.phone}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="relative block">
                      <Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.8} />
                      <input
                        type="time"
                        required
                        aria-label={t.booking.time}
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-4 pl-11 py-3 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </label>
                    <label className="relative block">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.8} />
                      <input
                        type="number"
                        required
                        min="1"
                        max="100"
                        inputMode="numeric"
                        aria-label={t.booking.people}
                        placeholder={t.booking.people}
                        value={form.people}
                        onChange={(e) => setForm({ ...form, people: e.target.value })}
                        className="w-full px-4 pl-11 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </label>
                  </div>

                  {/* Date Picker with Calendar */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full px-4 py-3 bg-secondary border border-border rounded-xl text-left flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4" strokeWidth={1.5} />
                        {selectedDate ? format(selectedDate, 'dd.MM.yyyy') : t.booking.date}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || isDateBooked(date)}
                        modifiers={{ booked: bookedDates }}
                        modifiersStyles={{
                          booked: {
                            textDecoration: 'line-through',
                            opacity: 0.4,
                            color: 'hsl(0 84% 60%)',
                          },
                        }}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  <textarea
                    placeholder={t.booking.message}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />

                  <motion.button
                    type="submit"
                    disabled={status === 'loading' || !selectedDate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full gold-gradient text-primary-foreground py-4 rounded-xl font-bold shadow-gold flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:brightness-110"
                  >
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                    {status === 'loading' ? '...' : t.booking.submit}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
