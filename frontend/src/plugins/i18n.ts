import en from '@/assets/languages/en-us.json';
import tw from '@/assets/languages/zh-tw.json';
import { createI18n } from 'vue-i18n';
type messageSchema = typeof tw;
const i18n = createI18n<[messageSchema], 'zh-tw' | 'en-us'>({
  legacy: false,
  locale: localStorage.getItem('locale') || "zh-tw",
  fallbackLocale: "zh-tw",
  messages: {
   'zh-tw' : tw,
   'en-us' : en
  }
});
export { i18n, type messageSchema };

