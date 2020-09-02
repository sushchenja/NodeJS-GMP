import { usersDb } from '../data-access';
import UserService from './userService';

const userService = new UserService(usersDb);

export {
    userService
};
