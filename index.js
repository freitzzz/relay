import express from 'express';

const app = express();

const port = process.env.PORT;
app.listen(port !== undefined ? port : 8080);