import { Request, Response, NextFunction } from 'express';
export default interface IMigrationController {
	migrate(req: Request, res: Response, next: NextFunction): any;

	seeds(req: Request, res: Response, next: NextFunction): any;
}
