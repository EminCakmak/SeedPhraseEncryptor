var CACHE_NAME = 'cache1';
var urlsToCache = [
  'manifest.json',
  'index.html',
  'style.css',
  'script.js',
  'encryption.js',
  'icon-152x152.png',
  'icon-512x512.png',
  'favicon.ico'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheKeys) {
      return Promise.all(
        cacheKeys.map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
