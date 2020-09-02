import express from 'express';
import routes from './routes';
import config from './config';
import { dbLoader } from './loaders';

const init = async () => {
    console.log(`Starting Sequelize + Express example on port ${port}...`);
    const app = express();
    app.use('/', routes);
    const port = config.port || 3000;
    await dbLoader();
    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
};

init();

