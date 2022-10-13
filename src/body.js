import express from 'express';

const bodyLimit = {
    limit: Number.MAX_SAFE_INTEGER
};

export const parsers = [
    express.raw,
    express.text,
    express.json,
    express.urlencoded
].map((cb) => cb(bodyLimit));