addEventListener('fetch', event => {
  event.respondWith((async () => {
    /** @type {Request} */
    const request = event.request;

    if (request.method !== "GET") {
      const responseMessage = "Cors ByHeru Proxy";
      
      return new Response(responseMessage, {
        status: 405,
        statusText: "GetOnly"
      });
    }

    const url = new URL(request.url);
    const parameters = new URLSearchParams(url.search);
    const targetUrl = parameters.get("url");

    if (targetUrl === null) {
      const responseMessage =
        "Contoh Link http://cors-proxy.byheru-premium.workers.dev/?url=https://example.com\n" +
        "Tambahkan User Agent `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 seperti Mac OS X) AppleWebKit/605.1.15 (KHTML, seperti Gecko) Versi/13.0.3 Seluler/15E148 Safari/604.1,gzip(gfe)`";

      return new Response(responseMessage, {
        status: 400
      });
    }

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 seperti Mac OS X) AppleWebKit/605.1.15 (KHTML, seperti Gecko) Versi/13.0.3 Seluler/15E148 Safari/604.1,gzip(gfe)",
      },
    });
    const responseBody = await response.text();

    return new Response(responseBody, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-ALlow-Headers": "*",
        "Content-Type": "text/plain"
      },
    })
  })())
})
