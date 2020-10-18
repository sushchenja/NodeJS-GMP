import { ErrorHandler } from '../helpers';

export default class AuthController {
    constructor(auth) {
        this.auth = auth;
        this.login = this.login.bind(this);
    }

    async login(req, res, next) {
        const { login, password } = req.body;

        try {
            const token = await this.auth.authenticate(login, password);

            if (token) {
                res.json(token);
            } else {
                throw new ErrorHandler('Bad username or password', 403);
            }
        } catch (error) {
            return next(ErrorHandler.wrap(this.auth.authenticate, { login, password }, error));
        }
    }
}
