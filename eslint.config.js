import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import * as parserVue from 'vue-eslint-parser';
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import * as parserTypeScript from '@typescript-eslint/parser';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ['**/.*', '*.d.ts', 'public/*', 'dist/*', 'src/assets/**'],
    languageOptions: {
      globals: {}
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      // 禁止使用 var
      'no-var': 'error',
      // 禁止使用 console
      'no-console': 'off',
      // 禁止使用 debugger
      'no-debugger': 'off',
      // 禁止不必要的转义字符
      'no-useless-escape': 'off',
      // 禁止出现未使用过的变量，忽略 _ 开头的参数和变量
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  },
  {
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      '@typescript-eslint/ban-types': 'off',
      // 检查并报错重复声明的变量
      '@typescript-eslint/no-redeclare': 'error',
      // 关闭对 TypeScript 注释的限制
      '@typescript-eslint/ban-ts-comment': 'off',
      // 允许使用显式的 `any` 类型
      '@typescript-eslint/no-explicit-any': 'off',
      // 建议使用 `as const` 而不是 `const` 断言类型
      '@typescript-eslint/prefer-as-const': 'warn',
      // 允许使用非空断言 `!`
      '@typescript-eslint/no-non-null-assertion': 'off',
      // 强制导入类型时不产生副作用
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // 关闭对显式指定导出函数和类的类型的要求
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 强制一致的类型导入方式
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' }
      ],
      // 建议优先使用字面量枚举成员
      '@typescript-eslint/prefer-literal-enum-member': [
        'error',
        { allowBitwiseExpressions: true }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.?([cm])js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {},
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,
      // 关闭对于组件 props 需要默认值的检查
      'vue/require-default-prop': 'off',
      // 关闭对于单行 HTML 元素内容换行的检查
      'vue/singleline-html-element-content-newline': 'off',
      // 关闭对于每行 HTML 属性数量的限制检查
      'vue/max-attributes-per-line': 'off',
      // 强制自定义事件的命名为驼峰式命名
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      // 显示警告，不建议使用 v-text 指令
      'vue/no-v-text': 'warn',
      // 显示警告，建议在 Vue 组件中添加间距行
      'vue/padding-line-between-blocks': 'warn',
      // 显示警告，建议直接导出 Vue 组件
      'vue/require-direct-export': 'warn',
      // 允许使用单个单词作为组件名
      'vue/multi-word-component-names': 'off',
      // 关闭对于 TypeScript 注释的检查
      '@typescript-eslint/ban-ts-comment': 'off',
      // 关闭对于显式声明 any 类型的检查
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off'
    }
  }
]);
