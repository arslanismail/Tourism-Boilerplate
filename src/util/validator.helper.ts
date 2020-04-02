import { Request, Response, NextFunction } from 'express';
import * as AppError from 'conduit-app-error';
import { ObjectSchema } from '@hapi/joi';

function validate(
	req: Request,
	res: Response,
	next: NextFunction,
	body: any,
	schemas: ObjectSchema<any>,
	options: any = undefined
) {
	const extra = options || { abortEarly: false, stripUnknown: true };
	const { error } = schemas.validate(body, extra);
	if (!error) {
		next();
	} else {
		const details = error.details;
		const message = details?.map((err: any) => {
			err.path.push(err.type.split('.').pop());
			const type = err.path
				.join('_')
				// .replace(/([A-Z])/g, "_$1")
				.toUpperCase()
				.replace('-', '_');
			return new AppError(type, err.message);
		});
		throw message;
	}
}

const ValidatorHelper = {
	headers: (schemas: ObjectSchema<any>) => (
		req: Request,
		res: Response,
		next: NextFunction
	) => validate(req, res, next, req.headers, schemas),
	params: (schemas: ObjectSchema<any>) => (
		req: Request,
		res: Response,
		next: NextFunction
	) => validate(req, res, next, req.params, schemas),
	body: (schemas: ObjectSchema<any>) => (
		req: Request,
		res: Response,
		next: NextFunction
	) => validate(req, res, next, req.body, schemas),
	query: (schemas: ObjectSchema<any>) => (
		req: Request,
		res: Response,
		next: NextFunction
	) => validate(req, res, next, req.query, schemas),
	validate: (body: any, schemas: ObjectSchema<any>) => (
		req: Request,
		res: Response,
		next: NextFunction
	) => validate(req, res, next, body, schemas),
};

export default ValidatorHelper;
