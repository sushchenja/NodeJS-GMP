import express from 'express';
import routes from './routes';
import config from './config';
import { dbLoader } from './loaders';
import { handleError, winston, morganLogger, customLogger } from './helpers';

const port = config.port || 3000;
const logger = config.useCustomLogger ? customLogger : morganLogger;


const init = async () => {
    console.log(`Starting Sequelize + Express example on port ${port}...`);
    const app = express();
    app.use(express.json());
    app.use(logger(winston.stream));
    app.use('/', routes);
    await dbLoader(config.isInitialStart);
    app.use(handleError(winston));
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
};

init();

process
    .on('unhandledRejection', err => {
        winston.error(`Unhandled Rejection: ${err.message}.\n ${err.stack}\n Shutting down...`);
        winston.on('finish', () => process.exit(1));
        winston.end();
    })
    .on('uncaughtException', err => {
        winston.error(`Unhandled Exception thrown: ${err.message}.\n ${err.stack}\n Shutting down...`);
        winston.on('finish', () => process.exit(1));
        winston.end();
    });
