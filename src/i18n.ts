import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import nl from './locales/nl.json';

const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
};

const normalizeLng = (value: string | null | undefined): 'en' | 'nl' | null => {
  const normalized = String(value || '').toLowerCase();
  if (normalized.startsWith('nl')) return 'nl';
  if (normalized.startsWith('en')) return 'en';
  return null;
};

const getInitialLanguage = (): 'en' | 'nl' => {
  if (typeof window === 'undefined') return 'en';

  const fromQuery = normalizeLng(new URLSearchParams(window.location.search).get('lng'));
  if (fromQuery) return fromQuery;

  try {
    const fromStorage = normalizeLng(window.localStorage.getItem('i18nextLng'));
    if (fromStorage) return fromStorage;
  } catch {
    // ignore storage access failures
  }

  return 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['nl', 'en'],
    load: 'languageOnly',
    lowerCaseLng: true,
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

i18n.on('languageChanged', (lng) => {
  const normalized = normalizeLng(lng) || 'en';

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', normalized);
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('i18nextLng', normalized);
    } catch {
      // ignore storage access failures
    }
  }
});

export default i18n;