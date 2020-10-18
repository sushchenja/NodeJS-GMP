import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema } from '../validation/auth';
import { auth } from '../controllers';

const router = express.Router();
const validator = createValidator({});

router.post('/', validator.body(bodySchema), auth.login);

export default router;
