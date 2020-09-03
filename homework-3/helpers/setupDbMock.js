const mockData = [
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

const getIsoTime = () => new Date().toISOString();

const mockValuesQuery = mockData.reduce((acc, user) => {
    acc = `${acc}(DEFAULT,'${user.login}','${user.password}','${user.age}','${getIsoTime()}','${getIsoTime()}'),`;
    return acc;
}, '').slice(0, -1);

const setupDbMock = async (sequelize) => {
    console.log('Will rewrite the SQLite example database, adding some data.');
    await sequelize.query('DROP TABLE IF EXISTS "users"');
    await sequelize.query(
        // eslint-disable-next-line
        'CREATE TABLE IF NOT EXISTS "users" ("id"   SERIAL , "login" VARCHAR(255), "password" VARCHAR(255), "age" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id"))'
    );

    await sequelize.query(
        `INSERT INTO "users" ("id","login","password","age","createdAt","updatedAt") VALUES ${mockValuesQuery}`
    );

    console.log('Done!');
};

export default setupDbMock;

