import visualizer from 'rollup-plugin-visualizer';

/**
 * 生成打包分析
 */
export default function configVisualizerPlugin(lifecycle: string) {
  if (lifecycle === 'report') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    });
  }
  return null as any;
}
