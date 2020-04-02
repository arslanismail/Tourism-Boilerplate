import { Request, Response, NextFunction } from 'express';
export default interface ICountryController {
	getIds(req: Request, res: Response, next: NextFunction): any;
}
