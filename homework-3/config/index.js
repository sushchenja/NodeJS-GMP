import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI,
    isInitialStart: process.env.IS_INITIAL_START
};
