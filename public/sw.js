const smashCache = 'smash-It';
const weatherCache = [
    '/',
    'index.html',
    'main.css',
    'images/winter-NY.jpg'
];


self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(smashCache)
        .then(cache =>{
            return cache.addAll(weatherCache);
        })
    )
});

self.addEventListener('activate', event=>{
    
})

self.addEventListener('fetch', event =>{
    event.respondWith(caches.match(event.request).then(cachedResponse =>{
        return cachedResponse || fetch(event.request);
    }));
});