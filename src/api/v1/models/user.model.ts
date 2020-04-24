import BaseModel from './base.model';
import Bcrypt from './../../../util/bcrypt';

class UserModel extends BaseModel {
	constructor() {
		super();
	}
	async create(userBody: any): Promise<any> {
		const user: any = userBody;
		// save user id details and get the id to proceed with the user creation method
		const getSavedIdDetails: number = await this.saveIdDetails(user);
		const countryId: number = parseInt(user.countryId);
		const password: string = user.password;
		const hashedPassword: any = await Bcrypt.hashPassword(password);
		const isEmailExists: any = await this.checkEmail(user.email);
		if (!isEmailExists) {
			try {
				const createUserId = await this.DB('CDT_Users')
					.insert({
						FullName: user.firstName + user.lastName,
						Email: user.email,
						CountryID: countryId,
						isNew: true,
						OTPStatus: false,
						EmailOTPStatus: false,
						DetailsId: getSavedIdDetails,
					})
					.returning('UserId');

				//  Store Password
				await this.DB('CDT_UserPasswords').insert({
					UserId: parseInt(createUserId),
					PasswordHash: hashedPassword,
					CreateTime: new Date(),
				});
				const result = await this.getUserById(parseInt(createUserId));
				result.status = true;
				return result;
			} catch (err) {
				console.log('Exception Console Error', err.message);
			}
		} else {
			return { status: false, data: 'Email Already Exists' };
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
			const checkEmail = await this.DB('CDT_Users')
				.where('Email', email)
				.first();
			return checkEmail;
		} catch (err) {
			console.log('Exception Console Error', err.message);
		}
	}

	async checkUserPassword(userId: any, _password: string): Promise<any> {
		try {
			const getHashedPassword = await this.DB('CDT_UserPasswords')
				.where('Userid', userId)
				.first();
			const reuslt = await Bcrypt.compare(
				_password,
				getHashedPassword.PasswordHash
			);
			return reuslt;
		} catch (err) {
			console.log('Exception Console Error', err.message);
		}
	}

	async login(_email: string, _password: string): Promise<any> {
		try {
			const getUserByEmail = await this.checkEmail(_email);
			if (!getUserByEmail) {
				return { status: false, data: 'Email Does Not Exists' };
			}
			const passwordChecking = await this.checkUserPassword(
				getUserByEmail.UserId,
				_password
			);
			if (passwordChecking) {
				getUserByEmail.status = true;
				return getUserByEmail;
			} else {
				return { status: false, data: 'Password Did Not Matched' };
			}
		} catch (err) {
			console.log('Exception Console Error', err.message);
		}
	}
}
export default new UserModel();
