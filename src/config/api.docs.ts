import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';
const swaggerJSDoc = require('swagger-jsdoc');
const { version, description } = require(path.join(
	process.cwd(),
	'package.json'
));

class ApiDoc {
	constructor() {}

	static getDefination() {
		return {
			openapi: '3.0.0',
			info: {
				title: 'mw.fs.j1.wrapper',
				version: version,
				description: description,
				'x-logo': {
					url:
						'https://www.aiondigital.com/wp-content/uploads/2018/07/Aion_white-1024x241.png',
					altText: 'mw.fs.j1.wrapper',
				},
				contact: {
					name: 'AION SUPPORT',
					url: 'https://www.aiondigital.com/support',
					email: 'qasim@aiondigital.com',
				},
				host: 'http://localhost:3000',
				basePath: '/api/v1',
			},
			securityDefinitions: {
				Authorization: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization',
				},
			},
			schemes: ['http', 'https'],
			consumes: ['application/json'],
			produces: ['application/json'],
			components: {},
		};
	}

	static fileContent() {
		const docsDefination = this.getDefination();
		const content = swaggerJSDoc({
			swaggerDefinition: docsDefination,
			apis: [path.join(__dirname, '../docs/**/*.yaml')],
		});
		return JSON.stringify(content, null, 2);
	}
}

export default ApiDoc;
