import { createLogger, format, transports } from 'winston';
import path from 'path';


const options = {
    file: {
        level: 'info',
        filename: path.resolve('./homework-3/logs/app.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => { // eslint-disable-line
    return `${level}: [${timestamp}] ${message}`;
});

const logger = createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false
});

logger.stream = {
    write(message) {
        logger.info(message);
    }
};

export default logger;
