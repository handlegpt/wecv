import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from './translations/en.json'
import zhTranslations from './translations/zh.json'
import zhTWTranslations from './translations/zh-tw.json'
import jaTranslations from './translations/ja.json'
import esTranslations from './translations/es.json'
import frTranslations from './translations/fr.json'
import deTranslations from './translations/de.json'

// English translations (default)
const enUS = {
  translation: enTranslations
}

// Chinese translations (simplified)
const zhCN = {
  translation: zhTranslations
}

// Chinese translations (traditional)
const zhTW = {
  translation: zhTWTranslations
}

// Japanese translations
const jaJP = {
  translation: jaTranslations
}

// Spanish translations
const esES = {
  translation: esTranslations
}

// French translations
const frFR = {
  translation: frTranslations
}

// German translations
const deDE = {
  translation: deTranslations
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': enUS,
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'ja-JP': jaJP,
      'es-ES': esES,
      'fr-FR': frFR,
      'de-DE': deDE
    },
    fallbackLng: 'en-US', // Set English as default
    lng: 'en-US', // Force default language
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    }
  })

export default i18n 