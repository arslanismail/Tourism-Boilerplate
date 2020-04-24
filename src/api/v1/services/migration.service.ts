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
			'CREATE TABLE IF NOT EXISTS address(id serial primary key,city character varying(500),street character varying(500),country character varying(500));'
		);
		await db
			.raw(
				'CREATE TABLE IF NOT EXISTS users(id serial primary key,password character varying(500),fullName character varying(500),phoneNumber character varying(500),gender character varying(500),roleId integer references roles(id) ,photoId integer references photos(id),addressId integer references address(id),is_active integer Null,email character varying(100) Null,joinDate date NOT NULL DEFAULT current_date);'
			)
			.then(() => {
				const result = { status: 200, data: 'Tables created successfully' };
				return result;
			});
	}
	async seeds(): Promise<any> {
		const role = await this.role();
		const address = await this.address();
		const photo = await this.photos();
		const user = await this.user();
		const response = [];
		response.push(role);
		response.push(address);
		response.push(photo);
		response.push(user);
		return response;
	}
	async role(): Promise<any> {
		const data = [{ type: 'tourist' }, { type: 'hotel' }, { type: 'driver' }];
		const roles = await db('roles').select();
		if (!roles.length) {
			const result = await db('roles').insert(data);
			return { status: 200, data: 'Role seeder' };
		} else {
			return { status: 400, data: 'Role Table already have data' };
		}
	}

	async photos(): Promise<any> {
		const fileName = faker.image.avatar();
		const result = await db('photos').insert({ file: fileName });
		return { status: 200, data: 'Photo seeder' };
	}
	async address(): Promise<any> {
		const street = faker.address.streetAddress();
		const city = faker.address.city();
		const country = faker.address.country();
		const result = await db('address').insert({
			street: street,
			city: city,
			country: country,
		});
		return { status: 200, data: 'address seeder' };
	}
	async user(): Promise<any> {
		const email = faker.internet.email();
		const date = faker.date.recent();
		const name = faker.name.firstName();
		const phone = faker.phone.phoneNumber();
		const roles = await db('roles').select('id');
		const photos = await db('photos').select('id');
		const address = await db('address').select('id');
		const roleIds: any = [];
		roles.forEach((element) => {
			roleIds.push(element.id);
		});
		const photoIds: any = [];
		photos.forEach((element) => {
			photoIds.push(element.id);
		});
		const addressIds: any = [];
		address.forEach((element) => {
			addressIds.push(element.id);
		});

		const user = await db('users').select();
		const result = await db('users').insert({
			fullname: name,
			phonenumber: phone,
			gender: 'Male',
			email: email,
			password: 'anypassword',
			is_active: 1,
			roleid: faker.random.arrayElement(roleIds),
			photoid: faker.random.arrayElement(photoIds),
			addressid: faker.random.arrayElement(addressIds),
			joindate: date,
		});
		return { status: 200, data: 'user seeder' };
	}
}

export default MigrationService;
