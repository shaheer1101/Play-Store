const CACHE_NAME = 'aneelas-makeover-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/launchericon-192x192.png',
  '/launchericon-512x512.png',
  '/screenshot-home.jpg'
];

// 1. Install Event: Assets ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Purana cache saaf karna
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Offline hone par cache se file dikhana
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
