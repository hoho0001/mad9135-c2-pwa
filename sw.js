importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.precaching.precacheAndRoute([
  'offline.html',
  'index.js',
  'js/main.js',
  'js/StarWarsApiService.js',
  'css/style.css',
  'images/offline.png',
  'images/icons/icon-72x72.png',
  "images/icons/icon-128x128.png",
  "images/icons/icon-144x144.png",
  "images/icons/icon-152x152.png",
  "images/icons/icon-192x192.png",
  "images/icons/icon-384x384.png",
  "images/icons/icon-512x512.png",
  "images/icons/icon-96x96.png",

],
  {
    directoryIndex: null,
  });

workbox.routing.registerRoute(
  new RegExp('.html'),
  new workbox.strategies.NetworkOnly({
    cacheName: 'htmlcache'
  })
);
workbox.routing.registerRoute(
  new RegExp('/$'),
  new workbox.strategies.NetworkOnly({
    cacheName: 'htmlcache'
  })
);

workbox.routing.registerRoute(
  new RegExp('.png'),
  new workbox.strategies.NetworkOnly({
    cacheName: 'pngcache'
  })
);
workbox.routing.registerRoute(
  /^https:\/\/(www\.)?localhost:8082(\/)?$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'home-page'
  })
)

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match('offline.html');
      break;
    case 'image':
      return caches.match('image/offline.png');
      break;
    // default:
    //     return Response.error();
  }
});

workbox.routing.registerRoute(
  new RegExp('https://api.octranspo1.com/v1.3'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'responseApi-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);




