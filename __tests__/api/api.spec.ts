import * as request from 'supertest';

import server from '../../src/server';

describe('Health API Tests', () => {
	it('should return a success message.', async () => {
		const someData: object = {
			name: 'Name',
			number: 8.5,
		};
		server.close();
		const res = await request(server)
			.post('/api/v1/health/check')
			.send(someData);
		expect(res.status).toEqual(200);
		expect(res.body).toHaveProperty('name');
		expect(res.body).toHaveProperty('number');
	});
});
