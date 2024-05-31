import { useDebounceFn } from '@vueuse/core';
import { generate, getRgbStr } from '@arco-design/color';

/**
 * 切换主题色
 */
export default function useColorTheme() {
  const createStyleString = (color, dark?: boolean) => {
    const hexList = generate(color, { list: true, dark });
    return hexList
      .map((hex, i) => {
        const rgb = getRgbStr(hex);
        return `--primary-${i + 1}: ${rgb}; --arcoblue-${i + 1}: ${rgb};`;
      })
      .join('');
  };

  /**
   * 更新主题色
   * @param color 主题色
   */
  const updateThemeColor = useDebounceFn(color => {
    const style = createStyleString(color);
    const darkStyle = createStyleString(color, true);
    const customStyle = `
      body{${style}}
      body[arco-theme='dark'] {${darkStyle}}
    `;

    injectStyle(customStyle);
  }, 10);

  /**
   * 注入样式
   * @param styleText 样式字符串
   */
  const injectStyle = (styleText: string) => {
    const oldStyle = document.getElementById('theme-color');

    if (oldStyle) {
      oldStyle.innerHTML = styleText;
    } else {
      const style = document.createElement('style');
      style.id = 'theme-color';
      style.innerHTML = styleText;
      document.head.appendChild(style);
    }
  };

  return {
    injectStyle,
    updateThemeColor
  };
}
