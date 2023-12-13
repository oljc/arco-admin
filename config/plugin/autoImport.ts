/**
 * 按需引入
 * https://github.com/antfu/unplugin-vue-components
 */
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default function autoImportPlugin() {
  return [
    AutoImport({
      imports: [],
      resolvers: [ArcoResolver()],
      dts: './src/types/auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue'],
      resolvers: [
        ArcoResolver({
          resolveIcons: true,
        }),
      ],
      dts: './src/types/components.d.ts',
    }),
  ];
}
