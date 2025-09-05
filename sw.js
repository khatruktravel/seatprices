// sw.js - Service Worker
const CACHE_NAME = 'flight-app-v1';
const urlsToCache = [
  './index.html',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
  'https://i.postimg.cc/XYgg7c0D/Logo-Yemenia.png',
  'https://i.postimg.cc/Dy9rcp7N/512.png'
];

// تثبيت الـ Service Worker وحفظ الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// استرجاع الملفات من الكاش أولاً، ثم من الشبكة إذا لم تكن موجودة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// تحديث الكاش عند تغيير النسخة
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});