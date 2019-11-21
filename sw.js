importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match('./offline.html');
      break;
    case 'image':
      return caches.match('./images/offline.png');
      break;
    // default:
    //     return Response.error();
  }
});

workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('.html'),
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  new RegExp('/$'),
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  new RegExp('.png'),
  new workbox.strategies.NetworkOnly()
);
workbox.routing.registerRoute(
  /^https:\/\/(www\.)?localhost:5501(\/)?$/,
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


workbox.routing.registerRoute(
  new RegExp("https://api.openweathermap.org/data/2.5/weather?id=6094817&units=metric&APPID=2d46092cb1d1df56a99dc89cffe08968"),
  new workbox.strategies.NetworkFirst({
    cacheName: 'responseApi-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);

workbox.precaching.precacheAndRoute([
  'offline.html',
  'manifest.json',
  'sw.js',
  'main.js',
  'style.css',
  'images/offline.png'
],
  {
    directoryIndex: null,
  });
