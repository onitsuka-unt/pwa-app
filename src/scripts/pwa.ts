import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true, // ページが読み込まれたときにServiceWorkerを登録するかどうか
});
