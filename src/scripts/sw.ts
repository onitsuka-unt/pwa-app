import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST);

declare let self: ServiceWorkerGlobalScope;

// 通知クリックイベントリスナー
self.addEventListener('notificationclick', (e) => {
  // 通知ポップアウトを閉じる
  e.notification.close();

  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
      // 対象URLに一致するウィンドウタブが既に存在する場合はそれにフォーカスする
      const hadWindowToFocus = clientsArr.some((windowClient) =>
        windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false,
      );
      // それ以外の場合はURLへの新しいタブを開いてそこにフォーカス
      if (!hadWindowToFocus)
        self.clients
          .openWindow(e.notification.data.url)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
    }),
  );
});