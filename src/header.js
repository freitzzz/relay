export const destinationUrlHeader = 'x-relay-url';
const bypassHeadersExposeHeader = 'x-bypass-expose-headers';
const alwaysIncludeBodyHeader = 'x-include-body';
const accessControlHeadersExposeHeader = 'access-control-expose-headers';

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

export function bypassExposeHeadersIfNeeded(req, res) {
    if (req.headers[bypassHeadersExposeHeader] !== undefined) {
        res.set(accessControlHeadersExposeHeader, '*');
    }
}