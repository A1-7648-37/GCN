// 量子通讯系统 - Service Worker 修复版
const CACHE_NAME = 'quantum-chat-v2.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/supabase.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap'
];

// 安装 Service Worker - 立即激活版本
self.addEventListener('install', event => {
  console.log('🔧 Service Worker 安装中...');
  
  // 跳过等待，立即激活
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 缓存核心文件');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker 安装完成，立即激活');
      })
      .catch(error => {
        console.error('❌ 缓存失败:', error);
      })
  );
});

// 激活 Service Worker - 强制清理旧缓存
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker 激活中...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 删除所有旧缓存
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker 激活完成，已清理旧缓存');
      // 立即控制所有客户端
      return self.clients.claim();
    })
  );
});

// 拦截请求 - 简化版本
self.addEventListener('fetch', event => {
  const request = event.request;
  
  // 忽略非 GET 请求和实时连接
  if (request.method !== 'GET' || 
      request.url.includes('realtime') || 
      request.url.includes('ws')) {
    return;
  }
  
  // 对于 HTML 请求，始终从网络获取，避免缓存问题
  if (request.destination === 'document' || 
      request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // 验证响应
          if (response && response.status === 200 && response.type === 'basic') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // 网络失败时返回缓存的版本
          return caches.match(request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html');
            });
        })
    );
    return;
  }
  
  // 对于其他静态资源，使用缓存优先策略
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request)
          .then(response => {
            // 检查响应是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 缓存新请求
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                // 只缓存同源请求
                const url = new URL(request.url);
                if (url.origin === self.location.origin) {
                  cache.put(request, responseToCache);
                }
              });
            
            return response;
          })
          .catch(error => {
            console.log('📡 网络请求失败:', request.url, error);
            // 对于CSS和JS文件，返回缓存的版本
            if (request.destination === 'style' || request.destination === 'script') {
              return caches.match(request);
            }
            return new Response('网络连接失败', { 
              status: 408, 
              statusText: 'Network Offline' 
            });
          });
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

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'GCN回响',
      body: event.data.text() || '新消息',
      icon: '/icons/icon-192x192.png'
    };
  }

  const options = {
    body: data.body || '新消息',
    icon: data.icon || '/icons/icon-192x192.png',
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
    self.registration.showNotification(data.title || 'GCN回响', options)
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
    console.log('🔄 执行后台同步');
    // 这里可以添加需要后台同步的逻辑
    // 比如同步未发送的消息等
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

// 定期同步函数 - 清理旧缓存
async function doPeriodicSync() {
  try {
    console.log('🧹 执行定期清理');
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    let cleanedCount = 0;

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader) {
          const date = new Date(dateHeader).getTime();
          if (date < oneWeekAgo) {
            await cache.delete(request);
            cleanedCount++;
          }
        }
      }
    }
    
    console.log(`✅ 定期清理完成，删除了 ${cleanedCount} 个旧缓存`);
  } catch (error) {
    console.error('❌ 定期同步失败:', error);
  }
}

// 处理 Service Worker 消息
self.addEventListener('message', event => {
  console.log('📨 收到消息:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: '2.1.0',
      cache: CACHE_NAME
    });
  }
});

console.log('🚀 Quantum Chat Service Worker 已加载');