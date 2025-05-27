import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly, CacheOnly } from 'workbox-strategies';
import { CACHE_NAME } from '../const';

// ServiceWorkerのメソッドにアクセスするためにselfキーワードを使用する必要がある
// TypeScriptで扱うにはこのファイル内でのselfはServiceWorkerGlobalScope型として扱ってと宣言
declare const self: ServiceWorkerGlobalScope;

// アプリ更新時に古いキャッシュを削除（古いキャッシュの肥大化を防ぐ）
cleanupOutdatedCaches();

// 事前キャッシュされたファイルを登録
precacheAndRoute(self.__WB_MANIFEST);

/**
 * ランタイムキャッシュ処理
 */
registerRoute(
  ({ request, sameOrigin }) => sameOrigin && request.destination === 'image' && request.url.endsWith('cache-check.jpg'),
  new CacheOnly({
    cacheName: CACHE_NAME,
  }),
);
registerRoute(
  ({ request }) => request.destination === 'image' && /^.*\/img_0[1-4]\.jpg$/.test(request.url),
  new NetworkOnly({
    fetchOptions: {
      cache: 'no-store', // ブラウザの HTTP キャッシュも使わない
    },
  }),
);

// クライアント側のボタン処理に応じてcache-check.jpgをキャッシュする
self.addEventListener('message', async (event) => {
  const { type, imageUrl, title, body, url } = event.data;

  if (type === 'CACHE_IMAGE' && imageUrl) {
    const cache = await caches.open(CACHE_NAME);

    try {
      const response = await fetch(imageUrl, { mode: 'no-cors' });
      await cache.put(imageUrl, response.clone());
      console.log(`[ServiceWorker] Cached image: ${imageUrl}`);
    } catch (error) {
      console.error(`[ServiceWorker] Failed to cache image: ${error}`);
    }
  }

  if (type === 'SHOW_NOTIFICATION') {
    // 3秒遅延して通知を表示
    await new Promise((resolve) => setTimeout(resolve, 3000));
    self.registration.showNotification(title, {
      body: body,
      data: { url: url },
    });
  }
});

/**
 * 通知イベント処理
 */
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

// ページを閉じるまで新しいServiceWorkerがアクティブにならないのですぐに有効化するためにskipWaitingを呼び出す
self.skipWaiting();
// 有効化したServiceWorkerをすぐにページへ適用する
clientsClaim();
