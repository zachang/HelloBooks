import request from 'supertest';
import jwtDecode from 'jwt-decode';
import chai from 'chai';
import app from '../../app';
import db from '../models';
import seeder from './seeder/auth_seed';

const User = db.User;
const assert = chai.assert;

require('dotenv').config();

describe('POST api/v1/users/signup', () => {
  beforeEach(seeder.emptyDB);
  beforeEach(seeder.addUserToDb);

  it('Should return status code 400 and a message when some inputs are invalid. i.e Username', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send(seeder.setData('Dawuda Ebenezer', '', 'zachangdawuda@gmail.com', '08153191512', 'password', 'password'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.errors.username[0], 'The username field is required.');
        done();
      });
  });
  it('should return status code 400 and a message when password not matched', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08153191512', 'asasas', 'password'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.errors.password[0], 'The password confirmation does not match.');
        done();
      });
  });
  it('Should create a new user account when input is valid and return status code 201 with a token', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send(seeder.setData('Dawuda Ebenezer', 'ebenezer13', 'zachangdawuda@gmail.com', '08153191512', 'password', 'password'))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.email, 'zachangdawuda@gmail.com');
        assert.equal(decodedToken.username, 'ebenezer13');
        done();
      });
  });
});
// Test for Signin route
describe('POST api/users/v1/signin', () => {
  // Empty our database
  before(seeder.emptyDB);
  // add to DB
  before(seeder.addUserToDb);
  it('Should return status code 404 and a message if username or password incorrect', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seeder.setLoginData('ebeneasd', 'password'))
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.message, 'Invalid credentials');
        done();
      });
  });
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seeder.setLoginData('ebenezer', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.username, 'ebenezer');
        done();
      });
  });
});
