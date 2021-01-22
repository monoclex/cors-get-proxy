# `cors-get-proxy`

Simple, CORS GET-only proxy, made with cloudflare workers.

This is probably going to get abused to hell and back just like all the other CORS proxies, so you're gonna want to host your own private one. Thankfully, it's hilariously easy with cloudflare. Just go into your dashboard -> workers -> new worker.

# Usage

```js
const params = new URLSearchParams();
params.set("url", "https://paste.mod.gg/raw/doneqiwiyu");

const url = new URL(`https://cors-get-proxy.sirjosh.workers.dev/?${params}`);

fetch(url)
  .then((response) => response.text())
  .then(console.log);
```
