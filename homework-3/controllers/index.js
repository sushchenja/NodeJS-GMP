import { userService, groupService, userGroupService, authService } from '../services';
import UserController from './userController';
import GroupController from './groupController';
import AuthController from './authController';


const user = new UserController(userService);
const group = new GroupController(groupService, userGroupService);
const auth = new AuthController(authService);

export {
    user,
    group,
    auth
};
