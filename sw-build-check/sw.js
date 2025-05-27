if (!self.define) {
  let e,
    c = {};
  const s = (s, r) => (
    (s = new URL(s + '.js', r).href),
    c[s] ||
      new Promise((c) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = c), document.head.appendChild(e);
        } else (e = s), importScripts(s), c();
      }).then(() => {
        let e = c[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, i) => {
    const f = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (c[f]) return;
    let o = {};
    const a = (e) => s(e, f),
      n = { module: { uri: f }, exports: o, require: a };
    c[f] = Promise.all(r.map((e) => n[e] || a(e))).then((e) => (i(...e), o));
  };
}
define(['./workbox-915e8d08'], function (e) {
  'use strict';
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: '_astro/index.Dx_EK3ej.css', revision: '9bec70cc9e9caf978c32b1da631e6f5c' },
        { url: '_astro/index.uZsnn3QI.css', revision: '9f7bc7a8df0d6f7c6f7c38d8bb3b0c87' },
        {
          url: '_astro/Layout.astro_astro_type_script_index_0_lang.D7g15XNH.js',
          revision: 'd7a473c0b27f4e2095cae78cf5df4f48',
        },
        { url: '_astro/workbox-window.prod.es5.B9K5rw8f.js', revision: 'd60138448ddfe6b549524d11f192875e' },
        { url: '192x192.png', revision: '6464bc7aa397cab64c1f484edc87bc3a' },
        { url: '512x512.png', revision: '1418a9c615181aaf89ba1c2355dfdaac' },
        { url: 'apple-touch-icon.png', revision: 'f4fd2bc78515b1223a615ae2556c6e56' },
        { url: 'assets/cache-check_01.jpg', revision: '84a8cefd46d731e82f720ff24428fc11' },
        { url: 'assets/cache-check_02.jpg', revision: '194b321a7f1c6839bb9f6b882f0cc4c0' },
        { url: 'assets/cache-check_03.jpg', revision: 'cc55ec845e5223f0af8a58b5ff0e6da3' },
        { url: 'assets/cache-check_04.jpg', revision: '7d74f2fd0653a2fcc44410891f4e9e79' },
        { url: 'assets/cache-check_05.jpg', revision: '9be39e0be8890bd4a2db96cdef6569cb' },
        { url: 'favicon.svg', revision: '8962c2dbbb0c993d2f0e7c33f4155393' },
      ],
      {},
    );
});
//# sourceMappingURL=sw.js.map
