

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open('fishingApp').then(function (cache) {
            return cache.addAll(
                [
                    '/',
                    '/assets/jquery-3.1.1.js?compile=false',
                    '/assets/index.css?compile=false',
                    '/assets/main.css?compile=false',
                    '/assets/bootstrap.css?compile=false',
                    '/assets/bootstrap-theme.css?compile=false',
                    '/assets/bootstrap.js?compile=false',
                    '/assets/index.js?compile=false',
                    '/assets/application.js?compile=false',
                    '/assets/logo.png',
                    '/assets/localforage/localforage.js?compile=false',
                    '/assets/localforage/localforage.min.js?compile=false',
                    '/assets/localforage/localforage.nopromises.js?compile=false',
                    '/assets/localforage/localforage.nopromises.min.js?compile=false',
                ]
            );
        })
    );
    console.log('Install event:', event);
});


 // Cache falling back to the network
 // https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

