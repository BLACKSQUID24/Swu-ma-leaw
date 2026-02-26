const CACHE_NAME = 'asthma-v1';
// เก็บเฉพาะไฟล์ที่เรามีใน GitHub จริงๆ เท่านั้น
const ASSETS = [
  './',
  'index.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // ใช้ addAll แบบระมัดระวัง ถ้าไฟล์ไหนไม่มีในเครื่อง มันจะ Error ทันที
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});