import * as knex from 'knex';
import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
	throw result.error;
}

const db = knex({
	client: process.env.DB_DIALECT,
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	pool: {
		min: 0,
		max: 7,
	},
});

db.raw('select 1+1 as result')
	.then((users) =>
		console.log(`Successful connected with ${process.env.DB_HOST} database.`)
	)
	.catch((err) => {
		console.log(err);
		process.exit(1);
		throw err;
	})
	.finally(() => {
		//db.destroy();
	});

export default db;
