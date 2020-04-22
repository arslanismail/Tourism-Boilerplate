import IMigrationController from './interfaces/IMigrationController';

import { Request, Response, NextFunction } from 'express';

import MigrationService from '../services/migration.service';
import IMigrationService from '../services/interfaces/IMigrationService';

const migrationService: IMigrationService = new MigrationService();

class MigrationController implements IMigrationController {
	constructor() {
		// Constructor Method.
	}

	async migrate(
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<any> {
		const result = await migrationService.migrate();
		console.log(result);
		if (result) {
			res.setHeader('Table created', result.data);
		}
		return res.json(result).end();
	}

	async seeds(req: Request, res: Response, _next: NextFunction): Promise<any> {
		const result = await migrationService.seeds();
		console.log(result);
		if (result) {
			res.setHeader('Table created', result.data);
		}
		return res.json(result).end();
	}
}

export default new MigrationController();
