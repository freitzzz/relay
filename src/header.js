export const destinationUrlHeader = 'X-RELAY-URL';

export function relayRequestCopy(req) {
    const headers = req.headers;

    const destinationUrl = headers[destinationUrlHeader];

    delete headers[destinationUrlHeader];
    delete req.params;
    delete req.baseUrl;

    req.url = destinationUrl;

    return req;
}