import { STATUS } from './constants';

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? STATUS.FAIL : STATUS.ERROR;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static wrap(fn, args, error) {
        error.controllerData = {
            arguments: args,
            method: fn.name
        };
        return error;
    }
}

export default ErrorHandler;
