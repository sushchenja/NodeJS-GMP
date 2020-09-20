export default class GroupsDb {
    constructor(group) {
        this.group = group;
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findByPk = this.findByPk.bind(this);
        this.destroy = this.destroy.bind(this);
        this.update = this.update.bind(this);
    }

    async create(group) {
        return await this.group.create(group);
    }

    async findAll() {
        return await this.group.findAll();
    }

    async findByPk(id) {
        return await this.group.findByPk(id);
    }

    async destroy(id) {
        return await this.group.destroy({
            where: {
                id
            }
        });
    }

    async update(id, groupUpdates) {
        const updatedGroup = await this.group.update(groupUpdates, {
            where: {
                id
            },
            returning: true
        });
        return updatedGroup[1];
    }
}
