const app = require('../app');
const request = require('supertest');

describe('router: index', () => {
  test('should respond with hello world', async () => {
    const response = await request(app.listen()).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello World');
  });
});
