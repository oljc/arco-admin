import { resolve } from 'path';
import { pluginsList } from './config';
import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite';

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_BASE } = loadEnv(mode, process.cwd());

  return {
    base: VITE_BASE,
    // 路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'assets': resolve(__dirname, 'src/assets'),
        'vue': 'vue/dist/vue.esm-bundler.js' // compile template
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              'src/assets/style/variables.less'
            )}";`
          },
          // https://lesscss.org/usage/#less-options
          math: 'parens-division',
          javascriptEnabled: true
        }
      }
    },
    plugins: [pluginsList()],
    // 依赖预构建-> https://cn.vitejs.dev/config/dep-optimization-options#dep-optimization-options
    optimizeDeps: {
      include: ['mitt', 'dayjs', 'axios', 'pinia', '@vueuse/core'],
      exclude: ['@iconify-icons/lets-icons']
    },
    server: {
      // 允许跨域
      cors: true,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 端口号（这里使用了变量 VITE_PORT）
      port: Number(VITE_PORT),
      // 本地跨域代理-> 代理到服务器的接口地址
      proxy: {},
      // 预热文件以降低启动期间的初始页面加载时长
      warmup: {
        // 预热的客户端文件：首页、views、 components
        clientFiles: ['./index.html', './src/{views,components}/*']
      }
    },
    build: {
      // 浏览器兼容目标
      target: 'es2015',
      // 是否生成 source map 文件
      sourcemap: false,
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name]-[hash].js',
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          compact: true,
          // 自定义 chunk
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['@visactor/vchart'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core']
          }
        }
      },
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 2000
    }
  };
};
