import * as JoiBase from '@hapi/joi';
import * as JoiPhoneNumber from 'joi-phone-number';
const Joi = JoiBase.extend(JoiPhoneNumber);

const checkEmailSchema = {
	email: Joi.string().email().lowercase().required(),
};

export const updateMobileSchmea = {
	mobileNumber: Joi.string().phoneNumber({
		defaultCountry: 'BH',
		// TODO: Enable this an resolve the phone number validation issue.
		strict: false,
	}),
};
export const registerSchema = {
	email: checkEmailSchema.email,
	password: Joi.string().required(),
	confirmPassword: Joi.string().required(),
	firstName: Joi.string().min(3).max(40).required(),
	lastName: Joi.string().min(3).max(40).required(),
	countryId: Joi.string().required(),
	mobileNumber: updateMobileSchmea.mobileNumber,
	dob: Joi.date().required(),
	cnic: Joi.string().required(),
	gender: Joi.string().required(),
	nationality: Joi.string().required(),
	idIssuer: Joi.string().required(),
	doe: Joi.date().required(),
	frontCardImage: Joi.string().required(),
	backCardImage: Joi.string().required(),
};

export const registerOtherSchema = {
	email: Joi.string().email().lowercase().required(),
	mobileNumber: Joi.string().required(),
	name: Joi.string().min(3).max(40).required(),
};

export const verifyOtpSchema = {
	otpCode: Joi.string().length(6).required(),
};

export const resendOtpSchema = {
	type: Joi.any().valid('SMS', 'EMAIL'),
};
export const loginSchema = {
	email: checkEmailSchema.email,
	password: registerSchema.password,
	remmeberMe: Joi.boolean().required(),
	platform: Joi.any().valid('A', 'I'),
};

export default checkEmailSchema;
