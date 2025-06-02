// app/sw.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

precacheAndRoute(self.__WB_MANIFEST);

// PokeAPI
registerRoute(
  ({ url }) =>
    url.origin === "https://pokeapi.co" && url.pathname.startsWith("/api/v2/"),
  new StaleWhileRevalidate({
    cacheName: "pokeapi-all",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 3600 }),
    ],
  })
);

// Image caching
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// Offline fallback for pages
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "page-cache",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

self.addEventListener("install", () => {
  console.log("SW installed");
});

self.addEventListener("activate", () => {
  console.log("SW activated");
});

// inside sw.js
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/_offline.html"))
    );
  }
});
