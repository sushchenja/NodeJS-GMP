import jwt from 'jsonwebtoken';
import config  from '../config';
import { ErrorHandler } from '../helpers';

const checkAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                throw new ErrorHandler('Failed to authenticate token', 403);
            }
            req.user = {
                id: decoded.sub
            };
            next();
        });
    } else {
        throw new ErrorHandler('No token provided', 401);
    }
};

export default checkAuth;
