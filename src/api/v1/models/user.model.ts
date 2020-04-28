import BaseModel from './base.model';
import Bcrypt from './../../../util/bcrypt';
import ResponseError from './../../../util/ResponseError';
import { Response } from 'express';

class UserModel extends BaseModel {
	constructor() {
		super();
	}
	async create(userBody: any): Promise<any> {
		const user: any = userBody;
		// save user id details and get the id to proceed with the user creation method
		const password: string = user.password;
		const hashedPassword: any = await Bcrypt.hashPassword(password);
		const comparePasswords: any = await Bcrypt.compare(user.confirmpassword, hashedPassword);
		const isEmailExists: any = await this.checkEmail(user.email);
		const getRoleId: any = await this.getRoleId(user.type);
		if (comparePasswords) {
			if (!isEmailExists) {
				try {
					const [photoId] = await this.DB('photos').insert({ file: user.file }).returning('id');
					const [addressId] = await this.DB('address')
						.insert({
							city: user.city,
							street: user.street,
							country: user.country,
						}).returning('id');
					const [createUserId] = await this.DB('users')
						.insert({
							fullname: user.fullname,
							email: user.email,
							password: hashedPassword,
							gender: user.gender,
							is_active: 1,
							phonenumber: user.phonenumber,
							roleid: getRoleId.id,
							photoid: photoId,
							addressid: addressId,
						})
						.returning('id');

					const result = { data: null, status: false };
					result.data = await this.userFindById(createUserId);
					result.status = true;
					return result;
				} catch (err) {
					throw new ResponseError(err.message, 'CREATE_USER_API', 400);
				}
			} else {
				throw new ResponseError('Email Already Exists', 'UNIQUE_EMAIL', 400);
			}
		} else {
			throw new ResponseError('Both Password does not match', 'PASSWORD_UNMATCH', 400);
		}
	}

	async getRoleId(role: any): Promise<any> {
		try {
			const getRole = await this.DB('roles').where('type', role).first();
			return getRole;
		} catch (error) {
			throw new ResponseError('Role Does not Exist', 'GET_ROLE_API', 400);
		}
	}

	async userFindById(id: number): Promise<any> {
		try {
			const user = await this.DB('users').where('id', id).first();
			return user;
		} catch (err) {
			throw new ResponseError(err.message, 'GET_USER_BY_ID', 400);
		}
	}

	async saveIdDetails(user: any): Promise<any> {
		try {
			const [savedIdDetails] = await this.DB('CDT_IdDetails')
				.insert({
					LastName: user.lastName,
					FirstName: user.firstName,
					DOB: user.dob,
					DOE: user.doe,
					Nationality: user.nationality,
					Issuer: user.idIssuer,
					Gender: user.gender,
					FrontCardImage: user.frontCardImage,
					BackCardImage: user.backCardImage,
					CreateTime: new Date(),
				})
				.returning('Id');
			return parseInt(savedIdDetails);
		} catch (err) {
			console.log('Exception Console Error', err.message);
		}
	}

	async getUserById(userId: number): Promise<any> {
		try {
			const user = await this.DB('CDT_Users').where('UserId', userId).first();
			return user;
		} catch (err) {
			console.log('Exception Console Error', err.message);
		}
	}

	async checkEmail(email: string): Promise<any> {
		try {
			const checkEmail = await this.DB('users').where('email', email).first();
			return checkEmail;
		} catch (err) {
			throw new ResponseError('Email Does Not Exist', 'CHECK_EMAIL_API', 400);
		}
	}

	async checkUserPassword(userId: any, _password: string): Promise<any> {
		try {
			const getHashedPassword = await this.DB('users')
				.where('email', userId)
				.first();
			const reuslt = await Bcrypt.compare(
				_password,
				getHashedPassword.password
			);
			return reuslt;
		} catch (err) {
			throw new ResponseError(err.message, 'CHECK_USER_PASSWORD_COMPARE', 400);
		}
	}

	async login(_email: string, _password: string): Promise<any> {
		try {
			const getUserByEmail = await this.checkEmail(_email);
			if (!getUserByEmail) {
				throw new ResponseError('Email Does not Exists', 'LOGIN_API', 400);
			}
			const passwordChecking = await this.checkUserPassword(
				getUserByEmail.email,
				_password
			);
			if (passwordChecking) {
				const getUserByEmails = { data: null, status: false };
				getUserByEmail.status = true;
				getUserByEmails.data = getUserByEmail;
				return getUserByEmails;
			} else {
				throw new ResponseError('Password Did Not Match', 'LOGIN_API', 400);
			}
		} catch (err) {
			throw new ResponseError(err.message, 'LOGIN_API', 400);
		}
	}
}
export default new UserModel();
