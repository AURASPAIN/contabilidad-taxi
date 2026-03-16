const CACHE_NAME = 'taxi-app-v2'; // <--- Hemos subido a V2
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono.png' // Asegúrate de que el icono está en la carpeta
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Obliga a activar la nueva versión ya
});

self.addEventListener('fetch', event => {
  // Para los datos del Excel (script.google), NO usamos caché, siempre internet
  if (event.request.url.includes('script.google')) {
    return fetch(event.request);
  }
  
  // Para el resto (estilos, iconos), intentamos internet y si falla, caché
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});