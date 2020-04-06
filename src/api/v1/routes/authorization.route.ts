import { Router } from 'express';
import { AuthorizationController } from '../controllers';

const router = Router();

router.post('/register', AuthorizationController.register);
router.post('/login', AuthorizationController.login);

export default router;
