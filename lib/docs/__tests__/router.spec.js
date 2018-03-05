const app = require('../../app');
const request = require('supertest');

describe('router: docs', () => {
  test('should respond with docs', async () => {
    const response = await request(app.listen()).get('/docs');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('docs');
  });
});
