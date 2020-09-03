import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, paramsSchema, querySchema } from '../validation/users';
import { user } from '../controllers';

const router = express.Router();
const validator = createValidator({});

router.post('/', validator.body(bodySchema), user.addNewUser);
router.put('/:id', validator.body(bodySchema), validator.params(paramsSchema), user.updateUser);
router.get('/', validator.query(querySchema), user.getAllUsers);
router.get('/:id', validator.params(paramsSchema), user.getUser);
router.delete('/:id', validator.params(paramsSchema), user.removeUser);

export default router;
