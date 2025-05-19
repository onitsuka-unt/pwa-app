import fs from 'fs';
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import iconsData from './icons.json';

const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  site: 'https://onitsuka-unt.github.io',
  ...(isDev ? {} : { base: '/pwa-app/' }),
  integrations: [
    AstroPWA({
      strategies: 'injectManifest',
      injectRegister: false, // Service Worker は手動で登録するので false にする
      srcDir: 'src/scripts', // Service Worker として、登録したいファイルを設定
      filename: 'sw.ts',
      devOptions: {
        enabled: true, // 開発環境でPWAを有効にして確認する場合は設定する
        type: 'module', // Service Workerのモジュールを使用する場合は設定する
      },
      // includeAssets: ['favicon.ico', 'apple-touch-icon.png'], // Service Workerのプリキャッシュに含めるアセット
      manifest: {
        display: 'standalone',
        name: 'PWA Practice Apps',
        short_name: 'PWA Apps',
        description: 'PWAサンプル用のアプリケーションになります。',
        icons: iconsData.icons, // 各サイズごとのアイコンは下記で生成 https://www.pwabuilder.com/imageGenerator
        // background_color: '#ffffff',
        // theme_color: '#000000',
      },
    }),
  ],
  vite: isDev
    ? {
        server: {
          https: {
            key: fs.readFileSync('./localhost-key.pem'),
            cert: fs.readFileSync('./localhost.pem'),
          },
        },
      }
    : undefined,
  build: {
    inlineStylesheets: 'never',
  },
});
