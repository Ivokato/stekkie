const cacheName = 'cache-v2';

const resources = [
  '/',
  '/privacy-policy',
  '/lib.js',
  '/pwa.js',
  '/style.css',
  '/app.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => Promise.all(resources.map(url => cache.add(url))))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(name => {
      // Delete cache entries for old version
      if (name !== cacheName) {
        return caches.delete(name);
      }
    })))
  );
});
