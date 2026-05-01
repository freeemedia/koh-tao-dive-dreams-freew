const CACHE = 'dive-asia-v1';
const PRECACHE = [
  '/',
  '/manifest.json',
  '/images/logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Only cache same-origin requests
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request).then((response) => {
        if (response.ok) {
          caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
        }
        return response;
      });
      return cached || networkFetch;
    })
  );
});
