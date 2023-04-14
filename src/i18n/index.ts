import { createI18n } from 'vue-i18n'
import trsEn from './translations/en.json'
import trsJa from './translations/ja.json'

const locale = window.navigator.language
const messages = {
  en: trsEn,
  ja: trsJa,
}

const i18n = createI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages: messages,
})

export default i18n
