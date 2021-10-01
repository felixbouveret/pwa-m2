const SERVICE_VERSION = "v1";

self.addEventListener("install", (event) => {
  console.log("[SW] Install event", event);

  self.skipWaiting();

  event.waitUntil(
    caches.open(SERVICE_VERSION).then((cache) => {
      return cache.addAll(["/", "/style.css"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activation event", event);

  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== SERVICE_VERSION) {
          console.log("[SW] Cache deleted");
          caches.delete(cacheName);
        }
      })
    );
  });
});

const getResponseFromCache = (res) =>
  caches
    .match(res)
    .then((responseFromCache) => {
      if (responseFromCache) {
        return responseFromCache;
      }
    })
    .catch((err) => {
      console.error(err);
    });

const updateCache = (request) => {
  return caches.open(SERVICE_VERSION).then((cache) => {
    return fetch(request).then((response) => {
      const responseClone = response.clone();
      if (response.status < 400) return cache.put(request, responseClone);
      return response;
    });
  });
};

self.addEventListener("fetch", (event) => {
  console.log("[SW] Fetch event", event);
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        updateCache(event.request);
        return res;
      })
      .catch(() => getResponseFromCache(event.request))
  );
});
