const CACHE_NAME = 'pacman-josefita-v1';
const urlsToCache = [
  './',
  './index.html',

  './pacman.js',
  './style.css',
  './manifest.json',
  './josefita.jpg',
  './sonidos/musica1.mp3',
  './sonidos/musica2.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Periodic Background Sync para mantener la cache actualizada
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'actualizar-cache') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
      })
    );
  }
});
