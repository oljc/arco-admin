/** @type {import("prettier").Config} */
export default {
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 行尾需要有分号
  semi: true,
  // 一行最多 80 个字符
  printWidth: 80,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 是否有引号格式保持一致
  quoteProps: 'consistent',
  // html 空格敏感规则
  htmlWhitespaceSensitivity: 'ignore',
  // 不缩进 vue 文件中的 script 和 style
  vueIndentScriptAndStyle: false,
  // 多行时不强制尾随逗号
  trailingComma: 'none',
  // 箭头函数参数括号
  arrowParens: 'avoid',
  // jsx 中使用单引号
  jsxSingleQuote: true
};
