// FunBook PWA Service Worker - 生产环境版本
const CACHE_NAME = 'funbook-prod-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
  console.log('FunBook PWA: Service Worker 已安装（生产环境）');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('FunBook PWA: 生产缓存已打开');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('FunBook PWA: 缓存失败', error);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  console.log('FunBook PWA: Service Worker 已激活（生产环境）');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('FunBook PWA: 删除旧缓存', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 返回缓存或网络请求
        return response || fetch(event.request);
      })
  );
});