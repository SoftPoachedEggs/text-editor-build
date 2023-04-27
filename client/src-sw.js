// Import Workbox modules
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Pre-cache all files in the __WB_MANIFEST array
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for page caching
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// // Define a matchCallback function to determine which requests to cache as static resources
// const cacheName = "static-resources";
// const matchCallback = ({ request }) => {
//   console.log(request);
//   return request.destination === "style" || request.destination === "script";
// };

// Warm the cache by pre-caching specified URLs with the pageCache strategy
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

//Register a route to cache all requests that match the matchCallback function
registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Register a route to cache all navigation requests with the pageCache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
// Create a CacheFirst strategy for asset caching
// const assetCache = new CacheFirst({
// cacheName: 'asset-cache',
// plugins: [
// new CacheableResponsePlugin({
// statuses: [0, 200],
// }),
// new ExpirationPlugin({
// maxAgeSeconds: 7 * 24 * 60 * 60,
// }),
// ],
// });

// Register a route to cache all requests for static assets
// registerRoute(
//   ({ request }) => ["style", "script", "worker"].includes(request.destination),
//   new StaleWhileRevalidate({
//     cacheName: "asset-cache",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// );
