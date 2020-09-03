export default class UsersDb {
    constructor(user, op) {
        this.user = user;
        this.op = op;
        this.create = this.create.bind(this);
        this.findByLoginAndLimit = this.findByLoginAndLimit.bind(this);
        this.findAll = this.findAll.bind(this);
        this.update = this.update.bind(this);
        this.findByPk = this.findByPk.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    async create(user) {
        return await this.user.create(user);
    }

    async findByLoginAndLimit(login, limit) {
        const { rows } = await this.user.findAndCountAll({
            where: login && {
                login: {
                    [this.op.substring]: login
                }
            },
            limit
        });

        return rows;
    }

    async findAll() {
        return await this.user.findAll();
    }

    async update(id, userUpdates) {
        const updatedUser = await this.user.update(userUpdates, {
            where: {
                id
            },
            returning: true
        });
        return updatedUser[1];
    }

    async findByPk(id) {
        return await this.user.findByPk(id);
    }

    async destroy(id) {
        return await this.user.destroy({
            where: {
                id
            }
        });
    }
}
