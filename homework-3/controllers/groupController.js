const GROUP_NOT_FOUND = 'Group with such id is not found';

export default class GroupController {
    constructor(group, userGroup) {
        this.group = group;
        this.userGroup = userGroup;
        this.addNewGroup = this.addNewGroup.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.addUsersToGroup = this.addUsersToGroup.bind(this);
    }

    async addNewGroup(req, res) {
        const group = req.body;

        const newGroup = await this.group.addNewGroup(group);

        res.json(newGroup);
    }

    async getAllGroups(req, res) {
        const groups = await this.group.getAllGroups();

        res.json(groups);
    }

    async getGroup(req, res) {
        const id = req.params.id;

        const group = await this.group.getGroup(id);

        if (group) {
            res.json(group);
        } else {
            res.status(404).send(GROUP_NOT_FOUND);
        }
    }

    async removeGroup(req, res) {
        const id = req.params.id;

        const removedGroup = await this.group.removeGroup(id);

        if (removedGroup) {
            res.json(removedGroup);
        } else {
            res.status(404).send(GROUP_NOT_FOUND);
        }
    }

    async addUsersToGroup(req, res) {
        const id = req.params.id;
        const { id: userIds } = req.query;

        const addedUsers = await this.userGroup.addUsersToGroup(id, userIds);

        res.send(addedUsers);
    }
}
