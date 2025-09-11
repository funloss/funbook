export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // 开发环境使用简化版本
      const swFile = '/service-worker.js';
      
      navigator.serviceWorker
        .register(swFile)
        .then((registration) => {
          console.log('FunBook PWA: Service Worker 注册成功', registration);
        })
        .catch((registrationError) => {
          console.log('FunBook PWA: Service Worker 注册失败', registrationError);
        });
    });
  } else {
    console.log('FunBook PWA: 浏览器不支持Service Worker');
  }
}