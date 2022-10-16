import { Axios, Header, Status, Url } from "./relay.js";

const axios = Axios.default;

async function relay(req, res) {
    const destinationRequest = Header.expressToAxiosRequest(req);

    try {
        const response = await axios.request(destinationRequest);
        res.set(Object.assign({}, response.headers));

        Header.bypassExposeHeadersIfNeeded(req, res);

        return res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error);

        return res.status(Status.unknownErrorStatusCode).send(Status.unknownErrorReplyData);
    }
}


function bozo(res) {
    return res.redirect(Url.bozoCorsRedirectUrl);
}

export default function (req, res) {
    const headers = req.headers;

    const destinationUrl = headers[Header.destinationUrlHeader];

    if (destinationUrl === undefined) {
        return bozo(res);
    } else {
        return relay(req, res);
    }
}