/* eslint linebreak-style: ["error", "windows"] */
const request = require('supertest');

const creatApp = require('../src/app');

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = creatApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for [GET] /', () => {
    test('should return "Hello World!"', () => request(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('Hello World!');
      }));
  });
});
