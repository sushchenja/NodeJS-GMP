const USER_NOT_FOUND = 'User with such id is not found';

export default class UserController {
    constructor(user) {
        this.user = user;
        this.addNewUser = this.addNewUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    async addNewUser(req, res) {
        const user = req.body;

        const newUser = await this.user.addNewUser(user);

        res.json(newUser);
    }

    async getAllUsers(req, res) {
        const { login, limit  } = req.query;

        const suggestedUsers = await this.user.getAllUsers(login, limit);

        res.json(suggestedUsers);
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const userUpdates = req.body;

        const updatedUser = await this.user.updateUser(id, userUpdates);

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send(USER_NOT_FOUND);
        }
    }

    async getUser(req, res) {
        const id = req.params.id;

        const user = await this.user.getUser(id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send(USER_NOT_FOUND);
        }
    }

    async removeUser(req, res) {
        const id = req.params.id;

        const removedUser = await this.user.removeUser(id);

        if (removedUser) {
            res.json(removedUser);
        } else {
            res.status(404).send(USER_NOT_FOUND);
        }
    }
}
