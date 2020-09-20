export default class UserGroupsDb {
    constructor(group, user, sequlize) {
        this.group = group;
        this.user = user;
        this.sequlize = sequlize;
    }

    async addUsersToGroup(groupId, userIds) {
        const transaction = await this.sequlize.transaction();

        try {
            const targetGroup = await this.group.findByPk(groupId, {
                transaction
            });

            const usersToAdd = await this.user.findAll({
                where: {
                    id: userIds
                },
                transaction
            });


            for (const user of usersToAdd) {
                await user.addGroup(targetGroup, {
                    transaction
                });
            }

            await transaction.commit();

            return await this.group.findByPk(groupId, {
                include: this.user
            });
        } catch (error) {
            if (transaction) {
                transaction.rollback();
            }
        }
    }
}
