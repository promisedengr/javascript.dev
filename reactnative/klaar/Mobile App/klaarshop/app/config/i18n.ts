import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type Language = 'en' | 'ru';

function getLanguage(lang: Language) {
  switch (lang) {
    case 'en':
      return require('../../i18n/en/translation.json');
    case 'ru':
    default:
      return require('../../i18n/ru/translation.json');
  }
}

function initI18n(defaultLang: Language) {
  i18n.use(initReactI18next).init({
    lng: defaultLang,
    fallbackLng: defaultLang,
    debug: false,
    resources: {
      'ru': {
        translation: getLanguage('ru'),
      },
      'en': {
        translation: getLanguage('en'),
      }
    },
  });
}

function changeLanguage(lang: Language) {
  i18n.changeLanguage(lang, () => {});
}

export { initI18n, changeLanguage };

