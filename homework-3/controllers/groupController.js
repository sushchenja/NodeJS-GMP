import { ErrorHandler } from '../helpers';
export default class GroupController {
    constructor(group, userGroup) {
        this.group = group;
        this.userGroup = userGroup;
        this.addNewGroup = this.addNewGroup.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.addUsersToGroup = this.addUsersToGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }

    async addNewGroup(req, res, next) {
        const group = req.body;

        try {
            const newGroup = await this.group.addNewGroup(group);

            if (newGroup) {
                res.json(newGroup);
            } else {
                throw new ErrorHandler('Failed to create group', 500);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.group.addNewGroup, { group }, error));
        }
    }

    async getAllGroups(req, res, next) {
        try {
            const groups = await this.group.getAllGroups();

            if (groups.length) {
                res.json(groups);
            } else {
                throw new ErrorHandler('No groups', 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.group.getAllGroups, {}, error));
        }
    }

    async getGroup(req, res, next) {
        const id = req.params.id;

        try {
            const group = await this.group.getGroup(id);

            if (group) {
                res.json(group);
            } else {
                throw new ErrorHandler(`Group with ID ${id} is not found`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.group.getGroup, { id }, error));
        }
    }

    async removeGroup(req, res, next) {
        const id = req.params.id;
        try {
            const removedGroup = await this.group.removeGroup(id);

            if (removedGroup) {
                res.json(removedGroup);
            } else {
                throw new ErrorHandler(`Group with ID ${id} is not found`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.group.removeGroup, { id }, error));
        }
    }

    async updateGroup(req, res, next) {
        const id = req.params.id;
        const groupUpdates = req.body;

        try {
            const updatedGroup = await this.group.updateGroup(id, groupUpdates);

            if (updatedGroup) {
                res.json(updatedGroup);
            } else {
                throw new ErrorHandler(`Group with ID ${id} is not found`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.group.updateGroup, { id, groupUpdates }, error));
        }
    }

    async addUsersToGroup(req, res, next) {
        const id = req.params.id;
        const { id: userIds } = req.query;

        try {
            const addedUsers = await this.userGroup.addUsersToGroup(id, userIds);

            if (addedUsers) {
                res.send(addedUsers);
            } else {
                throw new ErrorHandler('Failed add users to group', 500);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.group.addUsersToGroup, { id, userIds }, error));
        }
    }
}
