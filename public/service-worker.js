// FunBook PWA Service Worker - 开发环境版本
// 这是一个简化的Service Worker，用于开发环境

const CACHE_NAME = 'funbook-dev-v1';

// 安装 Service Worker
self.addEventListener('install', (event) => {
  console.log('FunBook PWA: Service Worker 已安装（开发环境）');
  // 开发环境中跳过缓存，直接完成安装
  self.skipWaiting();
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  console.log('FunBook PWA: Service Worker 已激活（开发环境）');
  event.waitUntil(self.clients.claim());
});

// 开发环境中不拦截网络请求，让Vite正常工作
self.addEventListener('fetch', (event) => {
  // 开发环境中直接让请求通过网络
  return;
});