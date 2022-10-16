export const destinationUrlHeader = 'x-relay-url';
const alwaysIncludeBodyHeader = 'x-include-body';

export function expressToAxiosRequest(req) {
    const headers = Object.assign({}, req.headers);
    const alwaysIncludeBody = headers[alwaysIncludeBodyHeader] !== undefined;

    const url = headers[destinationUrlHeader];
    const method = req.method;

    if (!alwaysIncludeBody && !method.startsWith('P')) {
        delete req.body;
    }

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