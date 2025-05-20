import { precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

// 通知クリックイベントリスナー
self.addEventListener('notificationclick', (e) => {
  // 通知ポップアウトを閉じます
  e.notification.close();
  // すべての Window クライアントを取得します
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
      // 対象 URL に一致するウィンドウタブが既に存在する場合は、それにフォーカスします。
      const hadWindowToFocus = clientsArr.some((windowClient) =>
        windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false,
      );
      // それ以外の場合は、適切な URL への新しいタブを開いてフォーカスします。
      if (!hadWindowToFocus)
        self.clients
          .openWindow(e.notification.data.url)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
    }),
  );
});
