import { usersDb, groupsDb, userGroupsDb } from '../data-access';
import UserService from './userService';
import GroupService from './groupService';
import UserGroupService from './userGroupService';
import AuthService from './authService';

const userService = new UserService(usersDb);
const groupService = new GroupService(groupsDb);
const userGroupService = new UserGroupService(userGroupsDb);
const authService = new AuthService(usersDb);

export {
    userService,
    groupService,
    userGroupService,
    authService
};
