import { generateSW } from 'workbox-build';

generateSW({
  globDirectory: 'sw-build-check/',
  globPatterns: ['**/*.{css,woff2,png,webp,svg,jpg,js}'],
  swDest: 'sw-build-check/sw.js',
});
