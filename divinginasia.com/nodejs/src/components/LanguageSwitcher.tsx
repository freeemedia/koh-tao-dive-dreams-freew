import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('en')}
        className="flex items-center space-x-1"
      >
        <span className="text-lg">🇺🇸</span>
        <span className="hidden sm:inline">EN</span>
      </Button>
      <Button
        variant={i18n.language === 'nl' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('nl')}
        className="flex items-center space-x-1"
      >
        <span className="text-lg">🇳🇱</span>
        <span className="hidden sm:inline">NL</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;