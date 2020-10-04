
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export default (stream) => (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const body = req.body;
    const start = process.hrtime();
    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        const log = `${method} ${url} ${status} ${durationInMilliseconds.toLocaleString()} ms ${JSON.stringify(body)}`;
        stream.write(`${log}\n`);
    });

    next();
};
