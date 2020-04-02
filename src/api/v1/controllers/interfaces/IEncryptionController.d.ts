import { Request, Response, NextFunction } from 'express';
export default interface IEncryptionController {
	decrypt(req: Request, res: Response, next: NextFunction): any;

	encrypt(req: Request, res: Response, next: NextFunction): any;
}
