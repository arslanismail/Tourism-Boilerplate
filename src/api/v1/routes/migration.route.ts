import { Router } from 'express';
import { MigrationController } from '../controllers';

const router = Router();

router.get('/migrate', MigrationController.migrate);
router.get('/seeds', MigrationController.seeds);

export default router;
