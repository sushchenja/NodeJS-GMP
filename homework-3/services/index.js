import { usersDb, groupsDb, userGroupsDb } from '../data-access';
import UserService from './userService';
import GroupService from './groupService';
import UserGroupService from './userGroupService';

const userService = new UserService(usersDb);
const groupService = new GroupService(groupsDb);
const userGroupService = new UserGroupService(userGroupsDb);

export {
    userService,
    groupService,
    userGroupService
};
