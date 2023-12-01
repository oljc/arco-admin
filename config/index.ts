import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import type { PluginOption } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import removeConsole from 'vite-plugin-remove-console';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import configCompressPlugin from './plugin/compress';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';
import configVisualizerPlugin from './plugin/visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export function pluginsList(): PluginOption[] {
  return [
    vue(),
    AutoImport({
      imports: [],
      resolvers: [ArcoResolver()],
      dts: './src/types/auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue'],
      resolvers: [ArcoResolver()],
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve('locales/**')],
    }),
    vueJsx(), // jsx支持
    removeConsole(), // 移除console
    svgLoader({ svgoConfig: {} }), // svg组件化支持
    configArcoStyleImportPlugin(), // Arco官方插件
    configCompressPlugin('gzip'), // 压缩
    configVisualizerPlugin('none'), // 打包分析
  ];
}
