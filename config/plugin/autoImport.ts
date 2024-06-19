import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

/**
 * 按需引入/自动导入
 */
export default function autoImportPlugin() {
  return [
    AutoImport({
      imports: [],
      resolvers: [ArcoResolver()],
      dts: './src/types/auto-imports.d.ts'
    }),
    Components({
      extensions: ['vue'],
      resolvers: [
        ArcoResolver({
          resolveIcons: false
        })
      ],
      dts: './src/types/components.d.ts'
    })
  ];
}
