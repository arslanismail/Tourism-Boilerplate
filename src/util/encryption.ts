import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

const result = dotenv.config();
const EtoEencryption = {
	decrypt: (req: Request, res: Response, next: NextFunction) => {
		const SECRET: any = process.env.ENCRYPTION_SECRET;
		const { Data } = req.body;
		var key = CryptoJS.enc.Utf8.parse(SECRET);
		var iv = CryptoJS.enc.Utf8.parse(SECRET);
		var decrypted = CryptoJS.AES.decrypt(Data, key, {
			keySize: 128 / 8,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		req.body = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
		next();
	},
	encrypt: (body: Object) => {
		const encryptedData = EtoEencryption.encryptCustom(JSON.stringify(body));
		let jsString = JSON.stringify({ Data: encryptedData });
		return jsString;
	},

	encryptCustom: (text: string) => {
		const SECRET: any = process.env.ENCRYPTION_SECRET;
		const key = CryptoJS.enc.Utf8.parse(SECRET);
		const iv = CryptoJS.enc.Utf8.parse(SECRET);

		var encryptedlogin = CryptoJS.AES.encrypt(
			CryptoJS.enc.Utf8.parse(text),
			key,
			{
				keySize: 128 / 8,
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			}
		);

		return encryptedlogin.toString();
	},
};
export default EtoEencryption;
