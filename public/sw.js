// Hermes Workspace Service Worker — PWA offline support
// Cache strategy: StaleWhileRevalidate for app shell, NetworkFirst for API

const CACHE_NAME = 'hermes-workspace-v1'
const OFFLINE_URL = '/'

// App shell assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {
        // Non-fatal: some assets may 404 during initial setup
      })
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin requests (except fonts)
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.')) return

  // Skip WebSocket, SSE, and API calls — must always go to network
  if (url.pathname.startsWith('/ws-') || url.pathname.startsWith('/api/')) return

  // NetworkFirst for HTML (dynamic pages)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    )
    return
  }

  // CacheFirst for static assets (JS, CSS, images, fonts)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Return cached, revalidate in background
        fetch(request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, response))
          }
        }).catch(() => {})
        return cached
      }
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      }).catch(() => {
        // If both cache and network fail for an asset, return nothing (let the page handle it)
      })
    })
  )
})
