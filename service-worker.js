const CACHE_NAME = 'prep-tracker-v9';
const ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Always try the network first for the app shell (index.html) and CDN
  // scripts, so updates show up immediately. Fall back to cache only when
  // offline. Static assets (icons, manifest) are cache-first since they
  // rarely change.
  const isAppShellOrCDN =
    event.request.mode === 'navigate' ||
    url.endsWith('index.html') ||
    url.includes('unpkg.com') ||
    url.includes('gstatic.com') ||
    url.includes('googleapis.com');

  if (isAppShellOrCDN) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
