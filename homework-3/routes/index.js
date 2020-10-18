import express from 'express';
import users from './users';
import groups from './groups';
import auth from './auth';
import { checkAuth } from '../middleware';

const router = express.Router();

router.use('/users', checkAuth, users);
router.use('/groups', checkAuth, groups);
router.use('/login', auth);

export default router;
