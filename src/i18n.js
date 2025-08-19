import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import DATA_EN from './locales/en.json';
import DATA_AR from './locales/ar.json';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    resources: {
      en: {
        translation: DATA_EN
      },
      ar: {
        translation: DATA_AR
      }
    },
    fallbackLng: 'ar',
    detection: {
        order: [
          "cookie",
          "localStorage",
          "htmlTag",
        ],
        cache: "cookie",
      },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
