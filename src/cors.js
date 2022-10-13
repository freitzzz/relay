import cors from 'cors';

const corsOptions = {
    credentials: true
};

export default function () {
    return cors(corsOptions);
}