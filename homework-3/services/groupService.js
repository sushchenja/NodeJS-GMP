export default class GroupService {
    constructor(groupDb) {
        this.groupDb = groupDb;
        this.addNewGroup = this.addNewGroup.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }

    async addNewGroup(user) {
        return await this.groupDb.create(user);
    }

    async getAllGroups() {
        return await this.groupDb.findAll();
    }

    async getGroup(id) {
        return await this.groupDb.findByPk(id);
    }

    async removeGroup(id) {
        return await this.groupDb.destroy(id);
    }

    async updateGroup(id, groupUpdates) {
        return await this.groupDb.update(id, groupUpdates);
    }
}
