const app = require('../app');
const request = require('supertest');

describe('middleware', () => {
  test('should use helmet', async () => {
    const response = await request(app.listen()).get('/');
    expect(response.header['x-content-type-options']).toEqual('nosniff');
  });
});
