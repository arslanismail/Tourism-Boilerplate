import * as Joi from '@hapi/joi';
import Validator from '../../../util/validator.helper';
import checkEmailSchema, {
	registerSchema,
	registerOtherSchema,
	verifyOtpSchema,
	resendOtpSchema,
	updateMobileSchmea,
	loginSchema,
} from './schema/auth.schema';
class BodyValidator {
	static checkEmail(): any {
		const validation = Joi.object()
			.required()
			.keys({
				email: checkEmailSchema.email,
			})
			.unknown(true);
		return Validator.body(validation);
	}

	static register(): any {
		const validation = Joi.object()
			.required()
			.keys({
				email: registerSchema.email,
				password: registerSchema.password,
				confirmPassword: registerSchema.confirmPassword,
				firstName: registerSchema.firstName,
				lastName: registerSchema.lastName,
				countryId: registerSchema.countryId,
				mobileNumber: registerSchema.mobileNumber,
				dob: registerSchema.dob,
				cnic: registerSchema.cnic,
				gender: registerSchema.gender,
				nationality: registerSchema.nationality,
				idIssuer: registerSchema.idIssuer,
				doe: registerSchema.doe,
				frontCardImage: registerSchema.frontCardImage,
				backCardImage: registerSchema.backCardImage,
			})
			.unknown(true);
		return Validator.body(validation);
	}

	static registerOther(): any {
		const validation = Joi.object()
			.required()
			.keys({
				email: registerOtherSchema.email,
				name: registerOtherSchema.name,
				mobileNumber: registerOtherSchema.mobileNumber,
			})
			.unknown(true);
		return Validator.body(validation);
	}

	static login(): any {
		const validation = Joi.object()
			.required()
			.keys({
				email: loginSchema.email,
				password: loginSchema.password,
				remmeberMe: loginSchema.remmeberMe,
				platform: loginSchema.platform,
			})
			.unknown(true);
		return Validator.body(validation);
	}
}

export default BodyValidator;
