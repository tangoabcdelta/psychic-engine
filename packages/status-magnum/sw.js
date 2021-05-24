self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("test-store").then((cache) => {
      //
      // The addAll() method of the Cache interface takes an
      // array of URLs, retrieves them, and adds the resulting
      // response objects to the given cache.
      //
      // The request objects created during retrieval become
      // keys to the stored response operations.
      cache.addAll([
        "/test/src/image.jpeg",
        //  "/src/image.jpeg"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request)
          .then(function(response) {
            // response may be used only once
            // we need to save clone to put one copy in cache
            // and serve second one
            let responseClone = response.clone();

            caches.open("v1").then(function(cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function() {
            return caches.match("/sw-test/gallery/myLittleVader.jpg");
          });
      }
    })
  );
});
