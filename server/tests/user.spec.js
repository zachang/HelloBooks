import request from 'supertest';
import chai from 'chai';
import jwtDecode from 'jwt-decode';
import bcrypt from 'bcrypt-nodejs';
import app from './../app';
import seeder from './seeder/authSeed';

const assert = chai.assert;

require('dotenv').config();

// Test for User routes
describe('TEST USER ROUTES', () => {
  let userId;
  let adminId;
  before(seeder.emptyUserTable);
  before(seeder.addUserToDb);
  before(seeder.addAdminToDb);

  let userToken; // store token for normal user authentication
  before((done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seeder.setLoginData('ebenezer', 'twinkle'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        userToken = res.body.token;
        userId = jwtDecode(userToken).id;
        done();
      });
  });

  let adminToken; // store token for admin user authentication
  before((done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seeder.setLoginData('ebenez', 'twinkle'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        adminToken = res.body.token;
        adminId = jwtDecode(userToken).id;
        done();
      });
  });

  // Test for list all user
  describe('test for GET api/v1/users when viewing list of all users', () => {
    it(`should return status code 401 when a user 
        wants to view the list of all users with no token`,
      (done) => {
        request(app)
          .get('/api/v1/users')
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
    it(`should return status code 401 when a user wants to view the
        list of all users with invalid token`,
      (done) => {
        request(app)
          .get('/api/v1/users')
          .set({ 'x-access-token': 'xxddghj' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it(`should return status code 403 when a user wants to view
        the list of all users with valid token but unauthorised`,
      (done) => {
        request(app)
          .get('/api/v1/users')
          .set({ 'x-access-token': userToken })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message,
              'You must be an admin to perform this operation');
            done();
          });
      });
    it(`should return status code 200 when a user wants to view
        the list of all users with valid token and authorised`,
      (done) => {
        request(app)
          .get('/api/v1/users')
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.users[0].username, 'ebenezer');
            assert.exists(res.body.paginationMeta);
            assert.exists(res.body.users);
            done();
          });
      });
    it(`should return status code 200 when a user wants to view
        the list of all users with valid token and authorised
        with query options for effective pagination`,
      (done) => {
        request(app)
          .get('/api/v1/users?limit=1&offset=1')
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.users[0].username, 'ebenez');
            assert.exists(res.body.paginationMeta);
            assert.exists(res.body.users);
            done();
          });
      });
  });

  // Test for list of one user
  describe('test for GET api/v1/users/:userId when viewing list of one user',
    () => {
      it(`should return status code 401 when a user
        wants to view his/her data with no token`,
        (done) => {
          request(app)
            .get(`/api/v1/users/${userId}`)
            .expect(401)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.message, 'No authorization token provided');
              done();
            });
        });
      it(`should return status code 401 when a user
        wants to view his/her data with invalid token`,
        (done) => {
          request(app)
            .get(`/api/v1/users/${userId}`)
            .set({ 'x-access-token': 'xxddghj' })
            .expect(401)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.message, 'Invalid authorization token');
              done();
            });
        });
      it(`should return status code 404 when a user wants to view
        his/her data with valid token but wrong user ID`,
        (done) => {
          request(app)
            .get(`/api/v1/users/0`)
            .set({ 'x-access-token': userToken })
            .expect(404)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.message, 'User does not exist');
              done();
            });
        });
      it(`should return status code 200 when a user wants to view
        his/her data with valid token`,
        (done) => {
          request(app)
            .get(`/api/v1/users/${userId}`)
            .set({ 'x-access-token': userToken })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.user.username, 'ebenezer');
              assert.equal(res.body.message, 'User displayed');
              done();
            });
        });
    });

  // Test for update user
  describe('test for PUT api/v1/users/:userId route for user update', () => {
    it('should return status code 401 when no token is provide', (done) => {
      request(app)
        .put(`/api/v1/users/${userId}`)
        .send({
          fullname: 'Micheal Opkosu',
          username: 'Shaggy',
          email: 'mitch@gmail.com',
          phoneNo: '09077777777'
        })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when invalid token is provide',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId}`)
          .set({ 'x-access-token': 'bnamma' })
          .send({
            fullname: 'Micheal Opkosu',
            username: 'Shaggy',
            email: 'mitch@gmail.com',
            phoneNo: '09077777777'
          })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it('should return status code 404 when user ID is not found', (done) => {
      request(app)
        .put(`/api/v1/users/0`)
        .set({ 'x-access-token': userToken })
        .send({
          fullname: 'Micheal Opkosu',
          username: 'Shaggy',
          email: 'mitch@gmail.com',
          phoneNo: '09077777777'
        })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'User Not Found');
          done();
        });
    });
    it('should return status code 400 when any or all user input is missing',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId}`)
          .set({ 'x-access-token': userToken })
          .send({
            fullname: '',
            username: '',
            email: '',
            phoneNo: ''
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.fullname[0],
              'The fullname field is required.');
            assert.equal(res.body.errors.username[0],
              'The username field is required.');
            assert.equal(res.body.errors.email[0],
              'The email field is required.');
            assert.equal(res.body.errors.phoneNo[0],
              'The phoneNo field is required.');
            done();
          });
      });
    it('should return status code 400 if fullname input not string',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId}`)
          .set({ 'x-access-token': userToken })
          .send({
            fullname: 92,
            username: 'Shaggy',
            email: 'mitch@gmail.com',
            phoneNo: '09077777777'
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.fullname[0],
              'The fullname must be a string.');
            done();
          });
      });
    it('should return status code 400 if fullname input not string',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId}`)
          .set({ 'x-access-token': userToken })
          .send({
            fullname: 'Micheal Opkosu',
            username: 44,
            email: 'mitch@gmail.com',
            phoneNo: '09077777777'
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.username[0],
              'The username must be a string.');
            done();
          });
      });
    it('should return status code 400 if email format is invalid',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId}`)
          .set({ 'x-access-token': userToken })
          .send({
            fullname: 'Micheal Opkosu',
            username: 44,
            email: 'mitch@gmail',
            phoneNo: '09077777777'
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.email[0],
              'The email format is invalid.');
            done();
          });
      });
    it('should return status code 400 if fullname input not string',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId}`)
          .set({ 'x-access-token': userToken })
          .send({
            fullname: 'Micheal Opkosu',
            username: 44,
            email: 'mitch@gmail.com',
            phoneNo: 777999
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.phoneNo[0],
              'The phoneNo must be a string.');
            done();
          });
      });
    it('should return status code 200 when user ID is found', (done) => {
      request(app)
        .put(`/api/v1/users/${userId}`)
        .set({ 'x-access-token': userToken })
        .send({
          fullname: 'Micheal Opkosu',
          username: 'phoneNo',
          email: 'mitch@gmail.com',
          phoneNo: '09077777777'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'User updated');
          assert.equal(res.body.update.fullname, 'Micheal Opkosu');
          assert.equal(res.body.update.username, 'phoneNo');
          assert.equal(res.body.update.email, 'mitch@gmail.com');
          assert.equal(res.body.update.phoneNo, '09077777777');
          done();
        });
    });
  });

  // Test for change user password
  describe('test for PUT /users/:userId/change-password ' +
    'route for password change',
  () => {
    it('should return status code 401 when no token is provide', (done) => {
      request(app)
        .post('/api/v1/users/change-password')
        .send({
          oldPassword: 'password',
          newPassword: 'password24',
          newPassword_confirmation: 'password24',
        })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when invalid token is provide',
      (done) => {
        request(app)
          .post('/api/v1/users/change-password')
          .set({ 'x-access-token': 'bnamma' })
          .send({
            oldPassword: 'password',
            newPassword: 'password24',
            newPassword_confirmation: 'password24',
          })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it('should return status code 400  when old password is incorrect',
      (done) => {
        request(app)
          .post('/api/v1/users/change-password')
          .set({ 'x-access-token': userToken })
          .send({
            oldPassword: 'password',
            newPassword: 'twinkle24',
            newPassword_confirmation: 'twinkle24',
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Incorrect old password');
            done();
          });
      });
    it('should return status code 400  when new password is not confirmed',
      (done) => {
        request(app)
          .post('/api/v1/users/change-password')
          .set({ 'x-access-token': userToken })
          .send({
            oldPassword: 'twinkle',
            newPassword: 'twinkle2',
            newPassword_confirmation: 'twinkle24',
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.newPassword[0],
              `The newPassword confirmation does not match.`);
            done();
          });
      });
    it('should return status code 400 when input fields are empty ',
      (done) => {
        request(app)
          .post('/api/v1/users/change-password')
          .set({ 'x-access-token': userToken })
          .send({
            oldPassword: '',
            newPassword: '',
            newPassword_confirmation: '',
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.oldPassword[0],
              `The oldPassword field is required.`);
            assert.equal(res.body.errors.newPassword[0],
              `The newPassword field is required.`);
            assert.equal(res.body.errors.newPassword_confirmation[0],
              `The newPassword confirmation field is required.`);
            done();
          });
      });
    it('should return status code 200 password updates successfully',
      (done) => {
        request(app)
          .post('/api/v1/users/change-password')
          .set({ 'x-access-token': userToken })
          .send({
            oldPassword: 'twinkle',
            newPassword: 'twinkle24',
            newPassword_confirmation: 'twinkle24',
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Password changed');
            assert.equal(bcrypt.compareSync('twinkle24',
              res.body.updated.password), true);
            done();
          });
      });
  });
});
