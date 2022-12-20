import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { convertLanguageJsonToObject } from './translations';
import de from './translations/de.json';
import en from './translations/en.json';

export const translationsJson = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

convertLanguageJsonToObject(en);

export const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: translationsJson,
    fallbackLng: 'en',
    returnEmptyString: false,
    interpolation: {
      escapeValue: false,
    },
  });
