import request from 'supertest';
import jwtDecode from 'jwt-decode';
import chai from 'chai';
import app from '../../app';
import seeder from './seeder/auth_seed';

const assert = chai.assert;

require('dotenv').config();

// Test for Signup route
describe('POST api/v1/users/signup', () => {
  before(seeder.emptyUserTable);// Empty user table
  before(seeder.addUserToDb);// Add to DB

  describe('test for fullname inputs', () => {
    it('should return status code 400 and a message when fullname input is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('', 'jordan99', 'zachangdawuda@gmail.com', '08153191512', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.fullname[0], 'The fullname field is required.');
          done();
        });
    });

    it('should return status code 400 and a message when fullname is not a string', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData(999, 'jordan99', 'zachangdawuda@gmail.com', '08153191512', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.fullname[0], 'The fullname must be a string.');
          done();
        });
    });
  });

  describe('test for username inputs', () => {
    it('should return status code 400 and a message when username input is empty', (done) => {
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

    it('should return status code 400 and a message when username less than 6 characters', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'mat09', 'zachangdawuda@gmail.com', '08153191512', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.username[0], 'The username must be at least 6 characters.');
          done();
        });
    });
  });

  describe('test for email inputs', () => {
    it('should return status code 400 and a message when email input is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'jacob09', '', '08153191512', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.email[0], 'The email field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when email format is invalid', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'jacob09', 'zachangdawuda.com', '08153191512', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.email[0], 'The email format is invalid.');
          done();
        });
    });
  });

  describe('test for password inputs', () => {
    it('should return status code 400 and a message when password is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08153191512', '', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.password[0], 'The password field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when password less than 6 characters', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08153191512', 'asas', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.password[0], 'The password must be at least 6 characters.');
          done();
        });
    });
    it('should return status code 400 and a message when password not matched', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08153191512', 'asasvvvv', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.password[0], 'The password confirmation does not match.');
          done();
        });
    });
    it('should return status code 400 and a message when password_confimation is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08153191512', 'password', ''))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.password_confirmation[0], 'The password confirmation field is required.');
          done();
        });
    });
  });

  describe('test for phone number inputs', () => {
    it('should return status code 400 and a message when phone_no is empty', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.phone_no[0], 'The phone no field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when phone_no is less than 11 characters', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08088992', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.phone_no[0], 'The phone no must be at least 11 characters.');
          done();
        });
    });
    it('should return status code 400 and a message when phone_no is greater than 11 characters', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', '08000000000000000', 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.phone_no[0], 'The phone no may not be greater than 11 characters.');
          done();
        });
    });
    it('should return status code 400 and a message when phone_no is not a string', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('Dawuda Ebenezer', 'ebenezer', 'zachangdawuda@gmail.com', 99, 'password', 'password'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.errors.phone_no[0], 'The phone no must be a string.');
          done();
        });
    });
  });

  describe('test for all inputs', () => {
    it('should create a new user account when all inputs are complete and return status code 201 with a token', (done) => {
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
    it('should not create a new user account when all inputs are incomplete and return status code 400 without token', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send(seeder.setData('', '', '', '', '', ''))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Validation error');
          done();
        });
    });
  });
});// end of signup describe()

// Test for Signin route
describe('POST api/users/v1/signin', () => {
  before(seeder.emptyUserTable);// Empty DB
  before(seeder.addUserToDb);// add to DB

  it('should return status code 404 and a message if username or password incorrect', (done) => {
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
  it('should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({ username: 'ebenezer', password: 'password' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body);
        const decodedToken = jwtDecode(res.body.token);
        assert.equal(decodedToken.username, 'ebenezer');
        done();
      });
  });
});// end of signin describe()
