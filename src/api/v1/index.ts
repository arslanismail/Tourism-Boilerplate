import { Router } from 'express';

import { HealthRoute, AuthorizationRoute, MigrationRoute } from './routes';

const router = Router();

router.use('/health', HealthRoute);
router.use('/auth', AuthorizationRoute);
router.use('/migratefile', MigrationRoute);
export default router;
