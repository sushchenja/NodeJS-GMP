import mockGroupsToUsers from './mockGroupsToUsers';

const groupsDataMock = [
    {
        name: 'Marvel',
        permissions: ['READ', 'WRITE']
    },
    {
        name: 'DC',
        permissions: ['DELETE', 'SHARE']
    },
    {
        name: 'FOX',
        permissions: ['UPLOAD_FILES']
    }
];

const usersDataMock = [
    {
        login: 'Jhon',
        password: 'Password1',
        age: 23
    },
    {
        login: 'Barbara',
        password: 'Password2',
        age: 55
    },
    {
        login: 'Steve',
        password: 'Password3',
        age: 27
    },
    {
        login: 'Alex',
        password: 'Password4',
        age: 13
    },
    {
        login: 'Kate',
        password: 'Password5',
        age: 18
    }
];


const mockDb = async (sequelize) => {
    const { group, user } = sequelize.models;
    await sequelize.sync({ force: true });
    await group.bulkCreate(groupsDataMock);
    await user.bulkCreate(usersDataMock);
    await mockGroupsToUsers(group, user);
};

export default mockDb;

