const C='vietnam-v12',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const put=n=>{if(n&&(n.ok||n.type==='opaque')){const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp))}return n};
  if(/tile\.openstreetmap\.org|api\.maptiler\.com/.test(e.request.url)){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(put)));return}
  e.respondWith(fetch(e.request).then(put).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
