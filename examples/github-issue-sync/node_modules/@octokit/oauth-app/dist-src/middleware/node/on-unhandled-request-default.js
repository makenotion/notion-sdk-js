export function onUnhandledRequestDefault(request, response) {
    response.writeHead(404, {
        "content-type": "application/json",
    });
    response.end(JSON.stringify({
        error: `Unknown route: ${request.method} ${request.url}`,
    }));
}
