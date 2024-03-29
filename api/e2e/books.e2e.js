/* eslint linebreak-style: ["error", "windows"] */
const request = require('supertest');
const { MongoClient } = require('mongodb');

const creatApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async () => {
    app = creatApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.collection('books').drop();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', async () => {
      // Arrange
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book1',
          year: 1998,
          author: 'nicolas',
        },
        {
          name: 'Book2',
          year: 1996,
          author: 'efrain',
        },
      ]);
      // Act
      console.log(seedData);
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // Assert
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});
