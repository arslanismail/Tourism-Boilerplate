import * as jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const Jwt = {
	encode: (payload: any): any => {
		const SECRET: any = process.env.APP_SECRET;
		return new Promise((resolve, reject) => {
			jsonwebtoken.sign(
				payload,
				SECRET,
				{
					expiresIn: '1y',
					algorithm: 'HS256',
				},
				(err, encoded) => {
					if (err) return reject(err);
					resolve(encoded);
				}
			);
		});
	},
	verify: (token: string): any => {
		const SECRET: any = process.env.APP_SECRET;
		return new Promise((resolve, reject) => {
			jsonwebtoken.verify(token, SECRET, (err: any, decodedToken: any) => {
				if (err || !decodedToken) return reject(err);
				resolve(decodedToken);
			});
		});
	},
};
export default Jwt;
