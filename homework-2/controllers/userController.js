import User from '../models/users';

const USER_NOT_FOUND = 'User with such id is not found';

const addNewUser = (req, res) => {
    const user = req.body;

    const newUser = User.create(user);
    res.json(newUser);
};

const getAllUsers = (req, res) => {
    const { login, limit  } = req.query;

    if (login || limit) {
        const suggestedUsers = User.getAutoSuggest(login, limit);
        res.json(suggestedUsers);
    } else {
        res.json(User.getAll());
    }
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const userUpdates = req.body;

    const updatedUser = User.update(id, userUpdates);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).send(USER_NOT_FOUND);
    }
};

const getUser = (req, res) => {
    const id = req.params.id;

    const user = User.get(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send(USER_NOT_FOUND);
    }
};

const removeUser = (req, res) => {
    const id = req.params.id;

    const removedUser = User.remove(id);
    if (removedUser) {
        res.json(removedUser);
    } else {
        res.status(404).send(USER_NOT_FOUND);
    }
};

export {
    addNewUser,
    getAllUsers,
    getUser,
    removeUser,
    updateUser
};
