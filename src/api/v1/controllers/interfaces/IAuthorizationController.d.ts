import { Request, Response, NextFunction } from 'express';
export default interface IAuthorizationController {
	register(req: Request, res: Response, next: NextFunction): any;
	login(req: Request, res: Response, next: NextFunction): any;
}
