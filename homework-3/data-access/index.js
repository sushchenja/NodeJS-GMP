import { Sequelize, Op } from 'sequelize';
import UsersDb from './usersDb';
import config from '../config';
import * as modelDefiners from '../models';

const sequelize = new Sequelize(config.databaseURL);

for (const modelDefiner of Object.values(modelDefiners)) {
    modelDefiner(sequelize);
}

const usersDb = new UsersDb(sequelize.models.user, Op);

export {
    sequelize,
    usersDb
};
