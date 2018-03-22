

if('function' === typeof importScripts) {
    importScripts('/fishingApp/assets/cache-polyfill.js');
}


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('fishingApp').then(function(cache) {
            return cache.addAll(
                [
                    '/fishingApp/index.html',
                    '/fishingApp/assets/index.css',
                    '/fishingApp/assets/main.css',
                    '/fishingApp/assets/application.js',
                    '/fishingApp/assets/index.js',
                    '/fishingApp/assets/bootstrap.js',
                    '/fishingApp/assets/bootstrap.css',
                    '/fishingApp/assets/bootstrap-theme.css',

                ]
            );
        })
    );
    console.log('Install event:', event);
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request));
});