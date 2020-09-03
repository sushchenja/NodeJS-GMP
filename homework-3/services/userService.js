export default class UserService {
    constructor(userDb) {
        this.userDb = userDb;
        this.addNewUser = this.addNewUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    async addNewUser(user) {
        return await this.userDb.create(user);
    }

    async getAllUsers(login, limit) {
        let suggestedUsers;

        if (login || limit) {
            suggestedUsers = await this.userDb.findByLoginAndLimit(login, limit);
        } else {
            suggestedUsers = await this.userDb.findAll();
        }

        return suggestedUsers;
    }

    async updateUser(id, userUpdates) {
        return await this.userDb.update(id, userUpdates);
    }

    async getUser(id) {
        return await this.userDb.findByPk(id);
    }

    async removeUser(id) {
        return await this.userDb.destroy(id);
    }
}
