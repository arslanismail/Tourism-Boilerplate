import * as Joi from '@hapi/joi';
import Validate from '../../util/validator.helper';
import { Application } from 'express';

class HeaderMiddleware {
	static AUTHORIZE() {
		const schema: Joi.ObjectSchema<any> = Joi.object().keys({
			'x-request-or-lang': Joi.string().max(2),
			'content-type': Joi.string().valid('application/json').required(),
		});
		return Validate.headers(schema);
	}
}

const config = (app: Application) => {
	app.use(HeaderMiddleware.AUTHORIZE());
};

export default { config };
