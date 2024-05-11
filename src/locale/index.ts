import { createI18n } from 'vue-i18n';

const defaultLocale = localStorage.getItem('arco-locale') || 'zh-CN';

const autoImportLocale = () => {
  let locale = Object.fromEntries(
    Object.entries(import.meta.glob('./*.y(a)?ml', { eager: true })).map(
      ([key, value]: any) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
        return [matched, value.default];
      }
    )
  );
  return locale;
};

const messages = autoImportLocale();

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  messages
});

export default i18n;
