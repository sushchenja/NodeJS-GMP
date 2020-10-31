const USER_DATA = 'userData';
const GROUP_DATA = 'groupData';
const ERROR = 'Service error';

const groupService =  {
    addNewGroup: () => Promise.resolve(GROUP_DATA),
    getAllGroups: () => Promise.resolve([GROUP_DATA]),
    getGroup: () => Promise.resolve(GROUP_DATA),
    removeGroup: () => Promise.resolve(GROUP_DATA),
    updateGroup: () => Promise.resolve(GROUP_DATA),
    addUsersToGroup: () => Promise.resolve([USER_DATA])
};

const groupServiceWithServiceError = {
    addNewGroup: () =>  Promise.reject(new Error(ERROR)),
    getAllGroups: () => Promise.reject(new Error(ERROR)),
    getGroup: () =>  Promise.reject(new Error(ERROR)),
    removeGroup: () => Promise.reject(new Error(ERROR)),
    updateGroup: () => Promise.reject(new Error(ERROR)),
    addUsersToGroup: () => Promise.reject(new Error(ERROR))
};

const groupServiceWithEmptyResult = {
    addNewGroup: () => Promise.resolve(null),
    getAllGroups: () => Promise.resolve([]),
    getGroup: () =>  Promise.resolve(null),
    removeGroup: () => Promise.resolve(null),
    updateGroup: () => Promise.resolve(null),
    addUsersToGroup: () => Promise.resolve(null)
};

export { groupService, groupServiceWithServiceError, groupServiceWithEmptyResult };
