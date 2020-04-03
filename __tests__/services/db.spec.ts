import * as dotenv from 'dotenv';
import * as knex from 'knex';

const result = dotenv.config();

if (result.error) {
	throw result.error;
}

describe('DB connection Test', () => {
	const db = knex({
		client: process.env.DB_DIALECT,
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
	});

	it('It Should Test Db connection By running a querry', async () => {
		const responseArray = await db.raw('select 1+1 as result');

		const [dbResponse] = responseArray.rows;

		await expect(dbResponse.result).toEqual(2);
	});
});
