import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, paramsSchema, querySchema } from '../validation/users';
import { addNewUser, removeUser, getAllUsers, getUser, updateUser } from '../controllers/userController';

const router = express.Router();
const validator = createValidator({});

router.post('/', validator.body(bodySchema), addNewUser);
router.put('/:id', validator.body(bodySchema), validator.params(paramsSchema), updateUser);
router.get('/', validator.query(querySchema), getAllUsers);
router.get('/:id', validator.params(paramsSchema), getUser);
router.delete('/:id', validator.params(paramsSchema), removeUser);

export default router;
