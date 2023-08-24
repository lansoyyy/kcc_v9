'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "fb47257fbeb75deb5d7e56734e638a86",
"assets/assets/fonts/Quicksand-Regular.ttf": "6cbafd2cb6e973c96ade779edc39c62a",
"assets/assets/fonts/Quicksand-SemiBold.ttf": "9e7757030c60a7a6973c9a95d9cea1c0",
"assets/assets/images/Asset%252010@4x-100.jpg": "d1277c6d5faa6f76187d62cd295f45b8",
"assets/assets/images/Asset%252010@4x.png": "6847ee94a5f6de7aba1a5d83c7050322",
"assets/assets/images/Asset%25201@4x-100.jpg": "236f22de54652d1e83dbae746523a331",
"assets/assets/images/Asset%25201@4x.png": "fb21495813c9e89bd1cfb5f38f6fb163",
"assets/assets/images/Asset%25202@4x-100.jpg": "46c8ee33f5a5a604229081c702579058",
"assets/assets/images/Asset%25202@4x.png": "52678b54cd7998d367de668de94c67f1",
"assets/assets/images/Asset%25203@4x-100.jpg": "c9002f5132af454b679b7fbfe4d91140",
"assets/assets/images/Asset%25203@4x.png": "f948e9867b9fe30264ee3586ab96ab64",
"assets/assets/images/Asset%25205@4x-100.jpg": "8c5299df93d4018336a13a2145f1f7d5",
"assets/assets/images/Asset%25205@4x.png": "78ae1dc1897e679100ed5d7e76b8f189",
"assets/assets/images/Asset%25206@4x-100.jpg": "c9473b58a4a3cbb24ee7780a751b4c2a",
"assets/assets/images/Asset%25206@4x.png": "be284b4e7deaf50957bc75881d421e02",
"assets/assets/images/Asset%25207@4x-100.jpg": "52785ebcb513426a5b59a708e8834249",
"assets/assets/images/Asset%25207@4x.png": "03d2dce113f0af0b32434e6767a2609d",
"assets/assets/images/Asset%25208@4x-100.jpg": "446eb0c6f3b9012510fddb04747486f9",
"assets/assets/images/Asset%25208@4x.png": "c78afd48dc594f1e60f30453c85896e6",
"assets/assets/images/Asset%25209@4x-100.jpg": "6bb306bd0b20d862133fa1a488fdf51e",
"assets/assets/images/Asset%25209@4x.png": "54f572d30a99c8a89b8d92d699e33592",
"assets/assets/images/back.jpg": "100c969479cbdd0607e8f20a43afd1d6",
"assets/assets/images/logo.png": "081fc44684eec551c9296a039fafc6d8",
"assets/assets/images/profile.png": "6f6bbb16aec97391aefe120ec5a4e6a2",
"assets/FontManifest.json": "ec22a4bfa77f90dc377b87ec82992dea",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "629459b3ee7f8256d3763e736bb8747f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "6847ee94a5f6de7aba1a5d83c7050322",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "83d75c6bc68d9ba84f4b5866e8b3907f",
"/": "83d75c6bc68d9ba84f4b5866e8b3907f",
"main.dart.js": "3954f355cff9e4abd6df6b01d332fe18",
"manifest.json": "0d211e296e1dbae71ee434bd6c8e5993",
"version.json": "2751904a67e1bd0d477adcfc5204723e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
