import { DEFAULT_MESSAGE, DEFAULT_STATUS_CODE, DEFAULT_STATUS } from './constants';

const handleError = (logger) => (err, req, res, next) => {  // eslint-disable-line
    err.statusCode = err.statusCode || DEFAULT_STATUS_CODE;
    err.status = err.status || DEFAULT_STATUS;
    err.message = err.message || DEFAULT_MESSAGE;

    const controllerLog = err.controllerData ? ` ${err.controllerData.method} ${JSON.stringify(err.controllerData.arguments)} ` : '';
    const errorStackLog = err.stack ? `\n${err.stack}` : '';
    logger.error(`${req.method} ${req.originalUrl} ${err.statusCode} - ${err.message} - ${req.ip}${controllerLog}${errorStackLog}`);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

export default handleError;
