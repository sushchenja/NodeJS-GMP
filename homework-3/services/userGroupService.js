export default class UserGroupService {
    constructor(userGroupDb) {
        this.userGroupDb = userGroupDb;
        this.addUsersToGroup = this.addUsersToGroup.bind(this);
    }

    async addUsersToGroup(groupId, userIds) {
        return await this.userGroupDb.addUsersToGroup(groupId, userIds);
    }
}
