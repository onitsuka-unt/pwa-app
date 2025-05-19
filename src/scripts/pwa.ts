import { registerSW } from 'virtual:pwa-register';

console.log('Attempting to register Service Worker...');

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    if (swScriptUrl) {
      console.log('SW registered: ', swScriptUrl);
    } else {
      console.error('SW registration failed: No script URL provided.');
    }
  },
  onRegisterError(error) {
    console.error('SW registration error: ', error);
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline');
  },
});