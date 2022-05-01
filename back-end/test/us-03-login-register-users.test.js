const { text } = require('body-parser');
const { expect, should } = require('chai');
const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

describe('US-03 login and register users', () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  });

  describe('Login', () => {
    describe('POST /login', () => {
      test('Should return 400 if no data', async () => {
        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({});

        expect(response.status).to.equal(400);
      });

      test('Should return 400 if email is missing', async () => {
        const data = {
          password: '1111Abc',
        };
        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('email');
      });

      test('Should return 400 if email property is empty', async () => {
        const data = {
          email: '',
          password: '1234Abc',
        };

        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('email');
      });

      test('Should return 400 if password is missing', async () => {
        const data = {
          email: 'ricksanchez@mail.com',
        };
        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('password');
      });

      test('Should return 400 if password property is empty', async () => {
        const data = {
          email: 'ricksanchez@mail.com',
          password: '',
        };
        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('password');
      });

      test('Should return 401 if username is not found', async () => {
        const data = {
          email: 'thisisnotarealemail@mail.com',
          password: '1111Abc',
        };
        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal(
          'username and or password is incorrect.'
        );
      });

      test('Should return 401 if password is incorrect', async () => {
        const data = {
          email: 'ricksanchez@mail.com',
          password: 'thisisnotacorrectpassword',
        };

        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal(
          'username and or password is incorrect.'
        );
      });

      test('Should return 200 if login is successful', async () => {
        const data = {
          email: 'ricksanchez@mail.com',
          password: '1234Abc',
        };

        const response = await request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send({ data });

        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.user_id).to.equal(1);
        expect(response.body.data.username).to.equal('thisisrick');
      });
    });
  });
  describe('register', () => {
    describe('POST /register', () => {
      test('Should return 400 if no data', async () => {
        const data = {};
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
      });

      test('SHould return 400 if first_name is missing', async () => {
        const data = {
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('first_name');
      });
      test('SHould return 400 if first_name is empty', async () => {
        const data = {
          first_name: '',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('first_name');
      });
      test('Should return 400 if last_name is missing', async () => {
        const data = {
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('last_name');
      });
      test('Should return 400 if last_name is empty', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('last_name');
      });
      test('Should return 400 if username is missing', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('username');
      });
      test('Should return 400 if username is empty', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: '',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('username');
      });
      test('Should return 400 if email is missing', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('email');
      });
      test('Should return 400 if email is empty', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: '',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('email');
      });
      test('Should return 400 if password is missing', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('password');
      });
      test('Should return 400 if password is empty', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: '',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('password');
      });
      test('Should return 400 if password is not a string', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: null,
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('password');
      });
      test('Should return 400 if password is a number', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: 123456789,
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.contain('password');
      });
      test('Should return 201 if user is created', async () => {
        const data = {
          first_name: 'testfirst_name',
          last_name: 'testlast_name',
          username: 'testusername',
          email: 'testemail@mail.com',
          password: '1234Abc',
        };
        const response = await request(app)
          .post('/register')
          .set('Accept', 'application/json')
          .send({ data });
        expect(response.status).to.equal(201);
        expect(response.body.error).to.be.undefined;
        expect(response.body.data.user_id).to.equal(4);
        expect(response.body.data.username).to.equal('testusername');
        expect(response.body.data.first_name).to.equal('testfirst_name');
        expect(response.body.data.last_name).to.equal(testlast_name);
      });
    });
  });
});
