const setupDbMock = async (sequelize) => {
    console.log('Will rewrite the SQLite example database, adding some data.');

    await sequelize.sync({ force: true });

    await sequelize.models.user.bulkCreate([
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
    ]);

    console.log('Done!');
};

export default setupDbMock;
