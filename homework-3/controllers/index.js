import { userService } from '../services';
import UserController from './userController';


const user = new UserController(userService);

export {
    user
};
