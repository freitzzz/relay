import _winston from 'winston';
import expressWinston from 'express-winston';

export const winston = expressWinston.logger({
    transports: [
        new _winston.transports.Console()
    ],
    format: _winston.format.combine(
        _winston.format.json()
    ),
    meta: true,
    expressFormat: true,
    colorize: false,
});