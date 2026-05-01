import React, { useMemo, useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        setInstallPrompt(null);
        setShowBanner(false);
      });
    }
  };

  const fallbackContent = useMemo(() => ({
    hero_title: t('hero.title'),
    hero_subtitle: t('hero.subtitle'),
    hero_primary_cta: t('hero.cta'),
    hero_secondary_cta: t('nav.courses'),
  }), [t, locale]);

  const { content } = usePageContent({
    pageSlug: 'home',
    locale,
    fallbackContent,
  });

  const titleWords = content.hero_title.split(' ');
  const titleLead = titleWords.slice(0, 3).join(' ');
  const titleAccent = titleWords.slice(3).join(' ');

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/whale-shark-snorkelling-fos-sustainable-certification-medium-1.webp')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-blue-900/20 to-blue-900/35"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {titleLead}
          {titleAccent ? <span className="block text-blue-300">{titleAccent}</span> : null}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          {content.hero_subtitle}
        </p>
        <div className="space-x-4">
          <a href="https://www.divinginasia.com/#contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            {content.hero_primary_cta}
          </a>
          <a href="/courses" className="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full font-semibold transition-all duration-300">
            {content.hero_secondary_cta}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white" />
      </div>

      {/* PWA install banner — shown when browser fires beforeinstallprompt (Android/Desktop Chrome) */}
      {showBanner && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 px-5 py-3 shadow-xl">
          <Download className="h-5 w-5 text-cyan-300 shrink-0" />
          <span className="text-white text-sm font-medium">
            {isDutch ? 'Installeer de app op je telefoon' : 'Install app on your phone'}
          </span>
          <button
            onClick={handleInstall}
            className="ml-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-1.5 text-sm font-semibold text-white transition"
          >
            {isDutch ? 'Installeer' : 'Install'}
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white/60 hover:text-white text-xs ml-1"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* iOS instruction — visible only on iPhone/iPad where beforeinstallprompt doesn't fire */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden ios-install-hint">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 px-5 py-3 shadow-xl">
          <Download className="h-5 w-5 text-cyan-300 shrink-0" />
          <span className="text-white text-sm">
            {isDutch
              ? 'Tik op Delen → "Zet op beginscherm" om de app te installeren'
              : 'Tap Share → "Add to Home Screen" to install'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
