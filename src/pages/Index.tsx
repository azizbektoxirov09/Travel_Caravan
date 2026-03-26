import { useState } from 'react';
import { Language } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FleetSection } from '@/components/FleetSection';
import { GuideSection } from '@/components/GuideSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />
      <HeroSection lang={lang} />
      <FleetSection lang={lang} />
      <GuideSection lang={lang} />
      <ReviewsSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Index;
