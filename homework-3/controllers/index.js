import { userService, groupService, userGroupService } from '../services';
import UserController from './userController';
import GroupController from './groupController';


const user = new UserController(userService);
const group = new GroupController(groupService, userGroupService);

export {
    user,
    group
};
