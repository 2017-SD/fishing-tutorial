

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
                    '/assets/cache-polyfill.js?compile=false',
                    '/assets/index.js?compile=false',
                    '/assets/application.js?compile=false',
                    '/assets/logo.png'
                ]
            );
        })
    );
    console.log('Install event:', event);
});


self.addEventListener('activate', function (event) {
    console.log('V1 now ready to handle fetches!');

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

