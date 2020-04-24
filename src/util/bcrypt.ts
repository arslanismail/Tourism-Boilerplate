import * as bcrypt from 'bcrypt';

export class Bcrypt {
	saltRounds: number;
	constructor() {
		this.saltRounds = 10;
	}
	async hashPassword(password: string): Promise<any> {
		return await bcrypt.hash(password, this.saltRounds);
	}
	async compare(password: string, hash: any): Promise<any> {
		return await bcrypt.compare(password, hash);
	}
}

export default new Bcrypt();
