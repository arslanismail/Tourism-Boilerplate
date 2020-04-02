import * as AppError from 'conduit-app-error';
import { Request, Response, NextFunction } from 'express';

export default () => {
	return (req: Request, res: Response, next: NextFunction): any => {
		try {
			const deviceId =
				req.headers && req.headers['x-device-id']
					? req.headers['x-device-id']
					: false;
			if (deviceId) {
				const userDeviceId = 'A23ns3kj3r';
				if (userDeviceId === deviceId) {
					next();
				} else {
					throw new AppError('DEVICE_NOT_MATCHED');
				}
			} else {
				throw new AppError('DEVICE_ID_REQUIRED');
			}
		} catch (err) {
			next(new AppError('INVALID_DEVICE_ID'));
		}
	};
};
