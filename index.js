import express from 'express';
import cors from 'cors';

import { Header, Status, Url } from './src/relay.js';
import axios from 'axios';

axios.defaults.validateStatus = (_) => true;

const app = express();

const corsOptions = {
    credentials: true
};

const bodyLimit = { limit: Number.MAX_SAFE_INTEGER };

app.use(express.raw(bodyLimit));
app.use(express.text(bodyLimit));
app.use(express.json(bodyLimit));
app.use(express.urlencoded(bodyLimit));

app.all('*', cors(corsOptions), handler);

function handler(req, res) {
    const headers = req.headers;

    const destinationUrl = headers[Header.destinationUrlHeader];

    if (destinationUrl === undefined) {
        return bozoReply(res);
    } else {
        return relay(req, res);
    }
}

async function relay(req, res) {
    const destinationRequest = Header.expressToAxiosRequest(req);

    try {
        const response = await axios.request(destinationRequest);
        res.headers = response.headers;

        return res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error);

        return res.status(Status.unknownErrorStatusCode).send(Status.unknownErrorReplyData);
    }
}

function bozoReply(res) {
    return res.redirect(Url.bozoCorsRedirectUrl);
}

const port = process.env.PORT;
app.listen(port !== undefined ? port : 8080);