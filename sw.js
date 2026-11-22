var V='druckkalk-v4',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(V).then(function(c){
    return Promise.all(F.map(function(u){return fetch(u,{cache:'reload'}).then(function(r){return c.put(u,r)})}));
  }));
  self.skipWaiting();
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}));
  }));
  self.clients.claim();
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request,{cache:'no-cache'}).then(function(r){
      var copy=r.clone();
      caches.open(V).then(function(c){c.put(e.request,copy)});
      return r;
    }).catch(function(){return caches.match(e.request)})
  );
});
