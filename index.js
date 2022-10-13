import express from 'express';

import { Body, Cors, Handler, Logger } from './src/relay.js';

const app = express();
const cors = Cors.default();

Body.parsers.forEach((p) => app.use(p));
app.use(Logger.winston);
app.all('*', cors, Handler.default);

const port = process.env.PORT;
app.listen(port !== undefined ? port : 8080);