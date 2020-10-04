import { Sequelize, Op } from 'sequelize';
import UsersDb from './usersDb';
import GroupsDb from './groupsDb';
import UserGroupsDb from './userGroupsDb';
import config from '../config';
import * as modelDefiners from '../models';

const sequelize = new Sequelize(config.databaseURL, {
    logging: false
});

for (const modelDefiner of Object.values(modelDefiners)) {
    modelDefiner(sequelize);
}

const { user, group, userGroup } = sequelize.models;

user.belongsToMany(group, { through: userGroup });
group.belongsToMany(user, { through: userGroup });

const usersDb = new UsersDb(user, Op);
const groupsDb = new GroupsDb(group);
const userGroupsDb = new UserGroupsDb(group, user, sequelize);

export {
    sequelize,
    usersDb,
    groupsDb,
    userGroupsDb
};
