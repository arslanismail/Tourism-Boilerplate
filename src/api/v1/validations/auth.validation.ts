import * as Joi from '@hapi/joi';
import Validator from '../../../util/validator.helper';
import checkEmailSchema, {
	registerSchema,
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
				confirmpassword: registerSchema.confirmpassword,
				fullname: registerSchema.fullname,
				gender: registerSchema.gender,
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
