import { defineConfig } from 'umi';
import path from 'node:path';

export default defineConfig({
  title: '哔哔音乐',
  npmClient: 'pnpm',
  mpa: {
    template: './template.html',
    // entry: {
    //   index: './src/index.tsx',
    // },
  },
  // https: {},
  alias: {
    '@wails': path.resolve('./wailsjs'),
  },
  extraBabelIncludes: [
    // path.join(__dirname, './app'),
    '@bb-music/app',
  ],
  mfsu: false,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:9799',
      changeOrigin: true,
    },
  },
});
