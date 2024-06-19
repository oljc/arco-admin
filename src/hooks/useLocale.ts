import { computed } from 'vue';
import { Message } from '@arco-design/web-vue';

export default function useLocale() {
  const currentLocale = computed(() => {
    return localStorage.getItem('arco-locale') || 'zh-CN';
  });
  const changeLocale = (value: string) => {
    localStorage.setItem('arco-locale', value);
    Message.success('切换语言成功，即将刷新页面');
  };
  return {
    currentLocale,
    changeLocale
  };
}
