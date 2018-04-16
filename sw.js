//This is the "Offline page" service worker

var path = '/',
    CACHE NAME = 'bluesoft-v1';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('CACHE_NAME').then(function(cache) {
      return cache.addAll([
        path,
        path + 'index.html',
        path + 'css/style.css',
      ])
    })
  );
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
addEventListener('fetch', function (event) {
  var response;
  event.respondWith(caches.match(event.request)
    .then(function(r) {
       response = r;
       if(!response){
          throw "Não tem no cache";
       }
       caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response);
       });
       return response.clone();
        }).cache(function() {
          return fetch(event.request).then(function(res){
            return res.clone();
          }, function(err);
             return caches.match(path + 'nao-disponivel.html')
          });
      })
   );
   
});