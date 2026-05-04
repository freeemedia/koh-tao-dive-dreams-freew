import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');
  const isDutch = i18n.language.startsWith('nl');
  const isRussian = i18n.language.startsWith('ru');

  const changeLanguage = async (lng: 'en' | 'nl' | 'ru') => {
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
    <div className="flex items-center space-x-0.5">
      <button
        onClick={() => void changeLanguage('en')}
        className={`text-base leading-none px-1 py-0.5 rounded transition-opacity ${isEnglish ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
        title="English"
      >🇺🇸</button>
      <button
        onClick={() => void changeLanguage('nl')}
        className={`text-base leading-none px-1 py-0.5 rounded transition-opacity ${isDutch ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
        title="Nederlands"
      >🇳🇱</button>
      <button
        onClick={() => void changeLanguage('ru')}
        className={`text-base leading-none px-1 py-0.5 rounded transition-opacity ${isRussian ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
        title="Русский"
      >🇷🇺</button>
    </div>
  );
};

export default LanguageSwitcher;