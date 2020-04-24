import * as Knex from 'knex';
import Db from '../src/config/db';


export async function up(knex: Knex): Promise<any> {
	return knex.schema
	.createTable('level', function(table) {
			table.increments().primary()
			table.string('name', 255).notNullable()
			table.string('email', 255).notNullable()
			table.string('password', 255).notNullable()
			table
					.boolean('account_verified')
					.notNullable()
					.defaultTo(false)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
}
}


export async function down(knex: Knex): Promise<any> {
}

