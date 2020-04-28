import * as JoiBase from '@hapi/joi';
import * as JoiPhoneNumber from 'joi-phone-number';
const Joi = JoiBase.extend(JoiPhoneNumber);

const checkEmailSchema = {
	email: Joi.string().email().lowercase().required(),
};
export const registerSchema = {
	email: checkEmailSchema.email,
	password: Joi.string().required(),
	confirmpassword: Joi.string().required(),
	fullname: Joi.string().min(3).max(40).required(),
	gender: Joi.string().required(),
	phonenumber: Joi.string().required(),
	type: Joi.string().required(),
	city: Joi.string().required(),
	street: Joi.string().required(),
	country: Joi.string().required(),
	file: Joi.string().required(),
};

export const loginSchema = {
	email: checkEmailSchema.email,
	password: registerSchema.password,
	// remmeberMe: Joi.boolean().required(),
	// platform: Joi.any().valid('A', 'I'),
};

export default checkEmailSchema;
