const CACHE_NAME = 'asthma-v2'; // เปลี่ยนเลขเวอร์ชันเพื่อล้าง Cache เก่า

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => caches.delete(key)));
        })
    );
});

self.addEventListener('fetch', (event) => {
    // เน้นดึงข้อมูลจาก Network ก่อนเสมอ เพื่อให้ปุ่มที่แก้ใหม่แสดงผล
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});