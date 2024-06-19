import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import type { PluginOption } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import removeConsole from 'vite-plugin-remove-console';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import autoImportPlugin from './plugin/autoImport';

export function pluginsList(): PluginOption[] {
  return [
    vue(),
    autoImportPlugin(),
    vueJsx(), // jsx支持
    removeConsole(), // 移除console
    svgLoader({ svgoConfig: {} }), // svg组件化支持
    configCompressPlugin('gzip', true), // 压缩
    configVisualizerPlugin('none') // 打包分析
  ];
}
