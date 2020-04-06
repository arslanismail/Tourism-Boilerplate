import IAuthorizationService from './interfaces/IAuthorizationService';
import { Request, Response } from 'express';
import JWT from '../../../util/jwt';
import User from '../models/user.model';
class AuthorizationService implements IAuthorizationService {
	constructor() {}

	async register(data: any): Promise<any> {
		const userTable = [];
		userTable.push(data);
		const resultData = {
			token: 'aaaa',
			email: 'arslanismail840@gmail..com',
			isMobileVerified: false,
			isEmailVerified: false,
			userId: '8f70f86c-9f80-4b02-8196-2e5cd530fa42',
			id: 2,
		};
		await data;
		console.log('Calling User Model to save data');

		const user = new User();
		user.getAllUsers();

		console.log('After Calling The Model');
		if (true) {
			const token = await JWT.encode({ id: resultData.id, type: 'customer' });
			resultData.token = token;
			return { status: 200, data: resultData, message: 'Success' };
		} else {
			return { status: 400, data: resultData, message: 'Bad Request' };
		}
	}

	async login(data: any): Promise<any> {
		const password = 'arslan';
		const queryData = {
			token: 'aaaaa',
			email: 'arslanismail840@gmail..com',
			isMobileVerified: false,
			isEmailVerified: false,
			userId: '8f70f86c-9f80-4b02-8196-2e5cd530fa42',
			id: 2,
		};
		await data;
		if (data.password === password && data.email === queryData.email) {
			// const token = await JWT.encode({ id: data.id, type: 'customer' });
			// queryData.token = token;
			return { status: 200, data: queryData, message: 'Success' };
		} else {
			return { status: 404, data: {}, message: 'Not Found' };
		}
	}
}

export default AuthorizationService;
