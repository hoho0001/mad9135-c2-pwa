importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
// workbox.routing.setDefaultHandler(
//     new workbox.strategies.StaleWhileRevalidate()
// );

workbox.precaching.precacheAndRoute([
    'offline.html',
    'index.js',
    'manifest.json',
    'sw.js',
    'js/main.js',
    'js/script.js',
    'js/StarWarsApiService.js',
    'css/style.css',
    'images/offline.jpg',
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
  new RegExp('.jpg'),
  new workbox.strategies.NetworkOnly({
      cacheName: 'jpgcache'
  })
);
workbox.routing.registerRoute(
  /^https:\/\/(www\.)?localhost:8082(\/)?$/,
  new workbox.strategies.NetworkFirst({
      cacheName: 'home-page'
  })
)
workbox.routing.registerRoute(
  /^https:\/\/hoho0001\.github\.io\/mad9135-c2-pwa/,
  new workbox.strategies.NetworkFirst({
      cacheName: 'home-page'
  })
)

workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
        case 'document':
            return caches.match('./offline.html');
            break;
        case 'image':
            return caches.match('./images/offline.jpg');
            break;
        // default:
        //     return Response.error();
    }
});

workbox.routing.registerRoute(
  new RegExp('https://swapi.co/api'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'responseApi-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);




