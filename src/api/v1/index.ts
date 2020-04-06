import { Router } from 'express';

import { HealthRoute, AuthorizationRoute } from './routes';

const router = Router();

router.use('/health', HealthRoute);
router.use('/auth', AuthorizationRoute);

export default router;
