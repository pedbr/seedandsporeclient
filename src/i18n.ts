import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

//Import all translation files
import enTranslation from './locales/en.json'
import ptTranslation from './locales/pt.json'

const resources = {
  en: {
    translation: enTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'en', //default language
})

export default i18next
