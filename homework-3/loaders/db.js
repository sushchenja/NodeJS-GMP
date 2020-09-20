import { sequelize } from '../data-access';
import { mockDb } from '../helpers';

export default async (isInitialStart) => {
    console.log('Checking database connection...');
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        if (isInitialStart) {
            console.log('Setting new DB data mock...');
            await mockDb(sequelize);
            console.log('Mock data added');
        }
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
};
