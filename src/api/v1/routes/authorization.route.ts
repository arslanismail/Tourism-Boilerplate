import { Router } from 'express';
import { AuthorizationController } from '../controllers';
import BodyValidator from './../validations/auth.validation';
const router = Router();

router.post(
	'/register',
	BodyValidator.register(),
	AuthorizationController.register
);
router.post('/login', AuthorizationController.login);

export default router;
