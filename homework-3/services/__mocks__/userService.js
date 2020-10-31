const ERROR = 'Service error';
const USER_DATA = 'userData';

const userService =  {
    addNewUser: () => Promise.resolve(USER_DATA),
    getAllUsers: () => Promise.resolve([USER_DATA]),
    updateUser: () => Promise.resolve(USER_DATA),
    getUser: () => Promise.resolve(USER_DATA),
    removeUser: () => Promise.resolve(USER_DATA)
};

const userServiceWithServiceError = {
    addNewUser: () =>  Promise.reject(new Error(ERROR)),
    getAllUsers: () => Promise.reject(new Error(ERROR)),
    updateUser: () =>  Promise.reject(new Error(ERROR)),
    getUser: () => Promise.reject(new Error(ERROR)),
    removeUser: () => Promise.reject(new Error(ERROR))
};

const userServiceWithEmptyResult = {
    addNewUser: () => Promise.resolve(null),
    getAllUsers: () => Promise.resolve([]),
    updateUser: () =>  Promise.resolve(null),
    getUser: () => Promise.resolve(null),
    removeUser: () => Promise.resolve(null)
};

export { userService, userServiceWithServiceError, userServiceWithEmptyResult };
