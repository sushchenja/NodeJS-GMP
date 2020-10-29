const USER_DATA = 'userData';

const userGroupService =  {
    addUsersToGroup: () => Promise.resolve([USER_DATA])
};

const userGroupServiceWithServiceError = {
    addUsersToGroup: () => Promise.reject(new Error('Service error'))
};

const userGroupServiceWithEmptyResult = {
    addUsersToGroup: () => Promise.resolve(null)
};

export { userGroupService, userGroupServiceWithServiceError, userGroupServiceWithEmptyResult };
