import express from 'express';
import users from './users';
import groups from './groups';

const router = express.Router();

router.use(express.json());
router.use('/users', users);
router.use('/groups', groups);

export default router;
