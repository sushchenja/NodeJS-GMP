import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, paramsSchema, querySchema } from '../validation/groups';
import { group } from '../controllers';

const router = express.Router();
const validator = createValidator({});

router.post('/', validator.body(bodySchema), group.addNewGroup);
router.get('/', group.getAllGroups);
router.get('/:id', validator.params(paramsSchema), group.getGroup);
router.delete('/:id', validator.params(paramsSchema), group.removeGroup);
router.put('/:id/', validator.body(bodySchema), validator.params(paramsSchema), group.updateGroup);
router.put('/:id/addUsers', validator.params(paramsSchema), validator.query(querySchema), group.addUsersToGroup);

export default router;
