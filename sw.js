// 量子通讯系统 - Service Worker
const CACHE_NAME = 'quantum-chat-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/supabase.js',
  '/sw.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// 安装Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 缓存核心文件');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker 安装完成');
        return self.skipWaiting();
      })
  );
});

// 激活Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker 激活中...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker 激活完成');
      return self.clients.claim();
    })
  );
});

// 拦截请求
self.addEventListener('fetch', event => {
  // 忽略Supabase实时连接和非GET请求
  if (event.request.url.includes('realtime') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 返回缓存或网络请求
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // 检查响应是否有效
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 克隆响应
          const responseToCache = response.clone();

          // 缓存新请求
          caches.open(CACHE_NAME)
            .then(cache => {
              // 只缓存同源请求
              if (event.request.url.startsWith(self.location.origin)) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        });
      })
      .catch(() => {
        // 网络失败时，对于文档请求返回离线页面
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// 处理后台同步
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('🔄 后台同步触发');
    event.waitUntil(doBackgroundSync());
  }
});

// 处理推送通知
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: '打开应用'
      },
      {
        action: 'close',
        title: '关闭'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 通知点击处理
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// 后台同步函数
async function doBackgroundSync() {
  try {
    // 这里可以添加需要后台同步的逻辑
    // 比如同步未发送的消息等
    console.log('🔄 执行后台同步');
  } catch (error) {
    console.error('❌ 后台同步失败:', error);
  }
}

// 处理定期后台任务
self.addEventListener('periodicsync', event => {
  if (event.tag === 'periodic-sync') {
    console.log('⏰ 定期同步触发');
    event.waitUntil(doPeriodicSync());
  }
});

// 定期同步函数
async function doPeriodicSync() {
  try {
    // 定期清理旧缓存
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const date = response.headers.get('date');
        if (date && new Date(date).getTime() < oneWeekAgo) {
          await cache.delete(request);
        }
      }
    }
  } catch (error) {
    console.error('❌ 定期同步失败:', error);
  }
}