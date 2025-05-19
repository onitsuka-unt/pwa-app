import { precacheAndRoute } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

// Service Worker側でURL遷移を処理するためのイベントリスナーを追加
// 適切な場合は OS に通知を送ります
if (Notification.permission === 'granted') {
  const notificationObject = {
    body: 'ここをクリックしてメッセージを表示してください。',
    data: { url: `${self.location.origin}/pwa-price/price` },
  };
  self.registration.showNotification('メッセージがあります', notificationObject);
}

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
