const CACHE_NAME = 'project-52-v42-total-rebuild-1';
const APP_SHELL = [
  './', './index.html', './manifest.json', './version.json',
  './northstar-v38.css', './northstar-v38.js',
  './northstar-v39.css', './northstar-v39.js',
  './northstar-v40.css', './northstar-v40.js', './northstar-v40-command.css',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './northstar-hero.svg', './mountain-trail.svg', './forge-mark.svg',
  './weekly-reflection-saturday-5pm.ics', './northstar-daily-checkin-5pm.ics'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, copy).catch(() => {});
              cache.put('./index.html', response.clone()).catch(() => {});
            }).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached || caches.match('./index.html') || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
      }
      return response;
    }))
  );
});
