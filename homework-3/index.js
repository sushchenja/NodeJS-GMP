import express from 'express';
import routes from './routes';
import config from './config';
import { dbLoader } from './loaders';

const port = config.port || 3000;

const init = async () => {
    console.log(`Starting Sequelize + Express example on port ${port}...`);
    const app = express();
    app.use('/', routes);
    await dbLoader(config.isInitialStart);
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
};

init();

