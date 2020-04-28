import IAuthorizationService from './interfaces/IAuthorizationService';
import { Request, Response } from 'express';
import JWT from '../../../util/jwt';
import User from '../models/user.model';
import BaseService from './BaseService';
class AuthorizationService extends BaseService
	implements IAuthorizationService {
	constructor() {
		super();
	}

	async register(data: any): Promise<any> {
		try {
			const result = await User.create(data);

			const token = await JWT.encode({ id: result.id });
			result.data.token = token;
			return this.sendResponse(result);
		} catch (error) {
			return this.commonErrorResponse(error);
		}
	}

	async login(data: any): Promise<any> {

		try {
			const result = await User.login(data.email, data.password);
			return this.sendResponse(result);
		} catch (error) {
			return this.commonErrorResponse(error);
		}
	}
}

export default AuthorizationService;
