import jwt from 'jsonwebtoken';
import config from '../config';

export default class AuthService {
    constructor(userDb) {
        this.userDb = userDb;
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(login, password) {
        const user = await this.userDb.findByLoginAndPassword(login, password);

        if (user) {
            const payload = {
                sub: user.id
            };
            return jwt.sign(payload, config.jwtSecret, {
                expiresIn: config.tokenExpireTime
            });
        }
    }
}
