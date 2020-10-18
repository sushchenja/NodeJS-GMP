import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI,
    isInitialStart: process.env.IS_INITIAL_START,
    useCustomLogger: process.env.USE_CUSTOM_LOGGER,
    jwtSecret: process.env.JWT_SECRET,
    tokenExpireTime: process.env.TOKEN_EXPIRE_TIME
};
