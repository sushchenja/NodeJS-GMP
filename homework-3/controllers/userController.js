import { ErrorHandler } from '../helpers';

export default class UserController {
    constructor(user) {
        this.user = user;
        this.addNewUser = this.addNewUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    async addNewUser(req, res, next) {
        const user = req.body;

        try {
            const newUser = await this.user.addNewUser(user);

            if (newUser) {
                res.json(newUser);
            } else {
                throw new ErrorHandler('Failed to create user', 500);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.user.addNewUser, { user }, error));
        }
    }

    async getAllUsers(req, res, next) {
        const { login, limit  } = req.query;

        try {
            const suggestedUsers = await this.user.getAllUsers(login, limit);

            if (suggestedUsers.length) {
                res.json(suggestedUsers);
            } else {
                throw new ErrorHandler(`No users containing ${login} in login`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.user.getAllUsers, { login, limit }, error));
        }
    }

    async updateUser(req, res, next) {
        const id = req.params.id;
        const userUpdates = req.body;

        try {
            const updatedUser = await this.user.updateUser(id, userUpdates);

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                throw new ErrorHandler(`User with ID ${id} is not found`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.user.updateUser, { id, userUpdates }, error));
        }
    }

    async getUser(req, res, next) {
        const id = req.params.id;

        try {
            const user = await this.user.getUser(id);

            if (user) {
                res.json(user);
            } else {
                throw new ErrorHandler(`User with ID ${id} is not found`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.user.getUser, { id }, error));
        }
    }

    async removeUser(req, res, next) {
        const id = req.params.id;

        try {
            const removedUser = await this.user.removeUser(id);

            if (removedUser) {
                res.json(removedUser);
            } else {
                throw new ErrorHandler(`User with ID ${id} is not found`, 404);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.user.removeUser, { id }, error));
        }
    }
}
