export const destinationUrlHeader = 'x-relay-url';
const contentTypeHeader = 'content-type';

export function expressToAxiosRequest(req) {
    const headers = Object.assign({}, req.headers);
    const contentType = headers[contentTypeHeader];

    if (contentType === undefined) {
        delete req.body;
    }

    const url = headers[destinationUrlHeader];
    const method = req.method;
    let data = req.body;

    delete headers[destinationUrlHeader];
    delete headers.host;

    return {
        url: url,
        method: method,
        headers: headers,
        data: data,
    }
}