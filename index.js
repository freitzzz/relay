import express from 'express';
import cors from 'cors';

import { Header, Url } from './src/relay.js';
import axios from 'axios';

const app = express();

const corsOptions = {
    credentials: true
};

app.all('*', cors(corsOptions), handler);

app.get('', function (req, res) {
    res.cookie()
})

function handler(req, res, next) {
    const headers = req.headers;

    const destinationUrl = headers[Header.destinationUrlHeader];

    if (destinationUrl === undefined) {
        bozoReply(res);
    } else {
        relay(req, res);
    }
}

function relay(req, res) {
    const destinationRequest = Header.relayRequestCopy(req);

    return axios
        .request(destinationRequest)
        .then((response) => {
            res.send(response.data);

            response.data;
            response.headers;
            response.request;
            response.status;
            response.status;
            response.statusText;
        });
}

function bozoReply(res) {
    return res.redirect(Url.bozoCorsRedirectUrl);
}

const port = process.env.PORT;
app.listen(port !== undefined ? port : 8080);