import fs from 'fs';
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  site: 'https://onitsuka-unt.github.io',
  ...(isDev ? {} : { base: '/pwa-app/' }),
  integrations: [
    AstroPWA({
      strategies: 'injectManifest', // generateSWだとWorkboxがServiceWorkerのファイルを自動的に生成する
      injectRegister: null, // ServiceWorker登録用のスクリプトを自動挿入するかどうか
      injectManifest: {
        globPatterns: ['**/*.{html,css,js,png,svg,ico}'], // キャッシュ対象のファイルを指定する
      },
      srcDir: 'src/scripts', // ServiceWorkerとして登録したい自前ファイルを設定
      filename: 'sw.ts', // ServiceWorkerのファイル名を設定
      devOptions: {
        enabled: true, // 開発環境でPWAを有効にして確認する場合は設定する
        type: 'module', // Service Workerのモジュールを使用する場合は設定する
      },
      manifest: {
        display: 'standalone',
        name: 'PWA Practice Apps',
        short_name: 'PWA Apps',
        description: 'PWAサンプル用のアプリケーションになります。',
        icons: [
          {
            purpose: 'any',
            src: '192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            purpose: 'any',
            src: '512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: '192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: '512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        background_color: '#ffffff',
        theme_color: '#000000',
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
