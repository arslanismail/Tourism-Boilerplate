// Update with your config settings.
import * as knex from 'knex';
import * as dotenv from 'dotenv';

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			filename: './dev.postgresql',
		},
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	production: {
		client: 'postgresql',
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
