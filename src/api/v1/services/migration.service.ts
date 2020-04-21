import IMigrationService from './interfaces/IMigrationService';
import db from '../../../config/db/index';
import * as faker from 'faker';

import { promises } from 'dns';

class MigrationService implements IMigrationService {
	constructor() {}
	async migrate(): Promise<any> {
		await db.raw(
			'CREATE TABLE IF NOT EXISTS roles(id serial primary key,type character varying(100));'
		);
		await db.raw(
			'CREATE TABLE IF NOT EXISTS photos(id serial primary key,file character varying(500));'
		);
		await db.raw(
			'CREATE TABLE IF NOT EXISTS adress(id serial primary key,city character varying(500),street character varying(500),country character varying(500));'
		);
		await db
			.raw(
				'CREATE TABLE IF NOT EXISTS users(id serial primary key,role_id integer references roles(id) ,photo_id integer references photos(id),adress_id integer references adress(id),is_active integer Null,email character varying(100) Null,date_joined date NOT NULL DEFAULT current_date);'
			)
			.then(() => {
				const result = { status: 200, data: 'Tables created successfully' };
				// console.log(result);
				return result;
			});
	}
	async seeds(): Promise<any> {
		// const name = faker.name.firstName();
		// const file = faker.image.avatar();

		// const street = faker.address.streetAddress();
		// const city = faker.address.city();
		// const country = faker.address.country();

		this.role();
		this.user();
	}
	async role(): Promise<any> {
		const data = [{ type: 'tourist' }, { type: 'hotel' }, { type: 'driver' }];
		const roles = await db('roles').select();
		if (!roles.length) {
			const result = await db('roles').insert(data);
			console.log('roles seeder has run');
		} else {
			console.log('role table already have data');
		}
	}
	async user(): Promise<any> {
		const email = faker.internet.email();
		const date = faker.date.recent();
		const name = faker.name.firstName();
		const roles = await db('roles').select('id');
		const roleIds: any = [];
		roles.forEach((element) => {
			roleIds.push(element.id);
		});

		const user = await db('users').select();

		const result = await db('users').insert({
			email: email,
			is_active: 1,
			role_id: faker.random.arrayElement(roleIds),
			photo_id: 1,
			adress_id: 1,
			date_joined: date,
		});
		console.log(result);
	}
}
export default MigrationService;
