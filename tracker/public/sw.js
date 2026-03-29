const CACHE = 'parzival-tracker-v1'
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))))
  self.clients.claim()
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(event.request).then(cached => {
        const network = fetch(event.request).then(res => {
          if (res.ok) cache.put(event.request, res.clone())
          return res
        }).catch(() => cached)
        return cached || network
      })
    )
  )
})