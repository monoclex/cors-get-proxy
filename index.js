addEventListener('fetch', event => {
  event.respondWith((async () => {
    /** @type {Request} */
    const request = event.request;

    if (request.method !== "GET") {
      const responseMessage = "This is a GET only cors proxy. See https://github.com/SirJosh3917/cors-get-proxy";
      
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
        "Bad usage! http://cors-get-proxy.sirjosh.workers.dev/?url=<put the url here>\n" +
        "Repo at https://github.com/SirJosh3917/cors-get-proxy\n" +
        "2022-05-26 update: Added `cors-get-proxy.sirjosh.workers.dev` to the User-Agent of this service.";

      return new Response(responseMessage, {
        status: 400
      });
    }

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "cors-get-proxy.sirjosh.workers.dev",
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
