import Db from '../../../config/db';
import BaseModel from './base.model';
export default class UserModel extends BaseModel {
	constructor() {
		super();
	}

	async getAllUsers() {
		const users = await this.DB('users');
	}
}
