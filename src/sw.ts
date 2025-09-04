/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

// self is of type ServiceWorkerGlobalScope
declare const self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

// Cache static assets with a stale-while-revalidate strategy
registerRoute(
  ({ request }) => ['style', 'script', 'worker', 'image', 'font'].includes(request.destination),
  new StaleWhileRevalidate({ cacheName: 'static-resources' })
);

// Cache API GET requests with a network-first strategy
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10,
  }),
  'GET'
);
