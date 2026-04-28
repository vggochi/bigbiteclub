const CACHE_NAME = 'big-bite-cache-v8';
const ASSETS = [
    '/',
    '/index.html',
    'manifest.json',
    '/assests/images/logo.png',
    '/assests/images/banner.png',
    '/assests/images/whatsapp.png',
];
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Preparando o smash no cache!🍔');
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});