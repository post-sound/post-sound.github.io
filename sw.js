'use strict';
importScripts('sw-toolbox.js'); toolbox.precache(['index.html”,”style/main.css']); toolbox.router.get('/*', toolbox.cacheFirst); toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5});