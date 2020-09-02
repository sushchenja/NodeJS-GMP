import express from 'express';
import users from './users';

const router = express.Router();

router.use(express.json());
router.use('/users', users);

export default router;
