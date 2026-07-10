import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');
  const isDutch = i18n.language.startsWith('nl');

  const changeLanguage = async (lng: 'en' | 'nl') => {
    try {
      window.localStorage.setItem('i18nextLng', lng);
    } catch {
      // no-op if storage is unavailable
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lng', lng);
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    } catch {
      // no-op if URL API is unavailable
    }

    await i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isEnglish ? 'default' : 'outline'}
        size="sm"
        onClick={() => {
          void changeLanguage('en');
        }}
        className="flex items-center space-x-1"
      >
        <span className="text-lg">🇺🇸</span>
        <span className="hidden sm:inline">EN</span>
      </Button>
      <Button
        variant={isDutch ? 'default' : 'outline'}
        size="sm"
        onClick={() => {
          void changeLanguage('nl');
        }}
        className="flex items-center space-x-1"
      >
        <span className="text-lg">🇳🇱</span>
        <span className="hidden sm:inline">NL</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;