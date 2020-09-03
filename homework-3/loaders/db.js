import { sequelize } from '../data-access';
import setupDbMock from '../helpers/setupDbMock';

export default async () => {
    console.log('Checking database connection...');
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        console.log('Setting new DB data mock...');
        await setupDbMock(sequelize);
        console.log('Mock data added');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
};
