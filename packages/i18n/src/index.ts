import { I18n } from './typings'
import get from 'lodash.get'

const LOCALE_KEY = '__locale__'

// TODO: 需重构
const handler = {
  get(_: any, name: string) {
    const locale = (window as any)[LOCALE_KEY]
    return get(locale, name)
  },
}

const i18n: I18n = new Proxy({}, handler)

function t(key: string) {
  const locale = (window as any)[LOCALE_KEY]
  return get(locale, key) || key
}

function getLocale() {
  return localStorage.getItem('__lang__') || 'default'
}

function setLocale(lang: string) {
  localStorage.setItem('__lang__', lang)
}

export { i18n, t, getLocale, setLocale, I18n }
