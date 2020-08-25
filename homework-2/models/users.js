import { v4 as uuidv4 } from 'uuid';

class User {
    constructor() {
        this.users = [];
    }

    static sanitizeUser(user) {
        if (user) {
            const { isDeleted, ...sanitizedUser } = user;
            return !isDeleted && sanitizedUser;
        }
    }

    static reduceAndSanitizeUsers(users) {
        return users.reduce((acc, item) => {
            const sanitizedUser = User.sanitizeUser(item);
            if (sanitizedUser) {
                acc.push(sanitizedUser);
            }
            return acc;
        }, []);
    }

    create({ login, password, age }) {
        const newUser = {
            id: uuidv4(),
            login,
            password,
            age,
            isDeleted: false
        };
        this.users.push(newUser);

        return User.sanitizeUser(newUser);
    }

    getAll() {
        return User.reduceAndSanitizeUsers(this.users);
    }

    get(id) {
        return User.sanitizeUser(this.users.find(user => user.id === id));
    }

    update(id, userUpdates) {
        const userToUpdateIndex = this.users.findIndex(user => {
            return user.id === id && !user.isDeleted;
        });
        let userToUpdate = this.users[userToUpdateIndex];

        if (userToUpdate) {
            userToUpdate = { ...userToUpdate, ...userUpdates };
            this.users[userToUpdateIndex] = userToUpdate;
            return User.sanitizeUser(userToUpdate);
        }
    }

    getAutoSuggest(loginSubstring, limit) {
        let suggestedUsers = this.getAll();
        if (loginSubstring) {
            suggestedUsers = suggestedUsers.filter(({ login }) => login.includes(loginSubstring));
        }
        if (limit) {
            suggestedUsers = suggestedUsers.splice(0, limit);
        }
        return suggestedUsers.sort((a, b) => a.login.localeCompare(b.login));
    }

    remove(id) {
        const userToRemove = this.users.find(user => user.id === id);
        if (userToRemove) {
            userToRemove.isDeleted = true;
            return userToRemove;
        }
    }
}

export default new User();
