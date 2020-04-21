import IAuthorizationController from './interfaces/IAuthorizationController';

import { Request, Response, NextFunction } from 'express';
import AuthorizationService from '../services/authorization.service';
import IAuthorizationService from '../services/interfaces/IAuthorizationService';
const authorizationService: IAuthorizationService = new AuthorizationService();

class AuthorizationController implements IAuthorizationController {
	constructor() {
		// Constructor Method.
	}

	async register(
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<any> {
		const result = await authorizationService.register(req.body);
		if (result.data.token) {
			res.setHeader('x-access-token', result.data.token);
		}
		return res.json(result).end();
	}

	async login(req: Request, res: Response, _next: NextFunction): Promise<any> {
		const result = await authorizationService.login(req.body);
		if (result.data.token) {
			res.setHeader('x-access-token', result.data.token);
		}
		return res.json(result).end();
	}
}

export default new AuthorizationController();
