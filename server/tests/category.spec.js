import request from 'supertest';
import chai from 'chai';
import app from './../app';
import seeder from './seeder/auth_seed';
import categoryseeder from './seeder/category_seed';


const assert = chai.assert;

require('dotenv').config();

// Test for Catgory POST route
describe('TEST CATEGORY ROUTES', () => {
  let createdCategoryId;
  before(seeder.emptyUserTable);
  before(categoryseeder.emptyCategoryTable);
  before(seeder.addUserToDb);
  before(seeder.addAdminToDb);

  let userToken; // store token for normal user authentication
  before((done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seeder.setLoginData('ebenezer', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        userToken = res.body.token;
        done();
      });
  });

  let adminToken; // store token for admin user authentication
  before((done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send(seeder.setLoginData('ebenez', 'password'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        adminToken = res.body.token;
        done();
      });
  });

  // Test for categories POST route
  describe('POST api/v1/categories when creating categories', () => {
    describe('test for empty, valid and invalid token when creating a book', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(app)
          .post('/api/v1/categories')
          .send(categoryseeder.setCatData('Epic'))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
      it('should return status code 401 when invalid token is provided', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set({ 'x-access-token': 'bajjlkall' })
          .send(categoryseeder.setCatData('Epic'))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
      it('should return status code 401 when token valid but unauthorised', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set({ 'x-access-token': userToken })
          .send(categoryseeder.setCatData('Epic'))
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You must be an admin to perform this operation');
            done();
          });
      });
      it('should return status code 201 and create category when token valid and authorised', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set({ 'x-access-token': adminToken })
          .send(categoryseeder.setCatData('Adventure'))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            createdCategoryId = res.body.category.id;
            assert.equal(res.body.message, 'Category created');
            done();
          });
      });
      it('should return status code 400 when token valid and authorised but with no category inputs', (done) => {
        request(app)
          .post('/api/v1/categories')
          .set({ 'x-access-token': adminToken })
          .send(categoryseeder.setCatData(''))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            done();
          });
      });
    });
  });

  // Test for categories GET route
  describe('test for GET api/v1/categories when viewing all categories', () => {
    it('should return status code 401 when user wants to view all categories with no token', (done) => {
      request(app)
        .get('/api/v1/categories')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when user wants to view all categories with invalid token', (done) => {
      request(app)
        .get('/api/v1/categories')
        .set({ 'x-access-token': 'xxddghj' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return status code 200 when user wants to view all categories with valid token', (done) => {
      request(app)
        .get('/api/v1/categories')
        .set({ 'x-access-token': userToken || adminToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'All categories displayed');
          assert.exists(res.body.category);
          assert.isArray(res.body.category);
          done();
        });
    });
  });

  // Test for categories PUT route
  describe('PUT api/v1/books/:categoryId when updating books', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .put('/api/v1/categories/1')
        .send(categoryseeder.setUpdateCatData('Sport'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when invalid token is provided', (done) => {
      request(app)
        .put('/api/v1/categories/1')
        .set({ 'x-access-token': 'bajjlkall' })
        .send(categoryseeder.setUpdateCatData('Sport'))
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return status code 401 when token valid but unauthorized', (done) => {
      request(app)
        .put('/api/v1/categories/1')
        .set({ 'x-access-token': userToken })
        .send(categoryseeder.setUpdateCatData('Sport'))
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'You must be an admin to perform this operation');
          done();
        });
    });
    it('should return status code 404  when categoryId is not found', (done) => {
      request(app)
        .put('/api/v1/categories/10000000')
        .set({ 'x-access-token': adminToken })
        .send(categoryseeder.setUpdateCatData('Sport'))
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Category Not Found');
          done();
        });
    });
    it('should return status code 400 when all category update inputs missing', (done) => {
      request(app)
        .put(`/api/v1/categories/${createdCategoryId}`)
        .set({ 'x-access-token': adminToken })
        .send(categoryseeder.setUpdateCatData(''))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Validation error');
          done();
        });
    });
    it('should return status code 200 and update category when categoryId is found', (done) => {
      request(app)
        .put(`/api/v1/categories/${createdCategoryId}`)
        .set({ 'x-access-token': adminToken })
        .send(categoryseeder.setUpdateCatData('Sport'))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Category updated');
          done();
        });
    });
  });

  // Test for categories DELETE route
  describe('DELETE api/v1/books/:categoryId when updating books', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .delete('/api/v1/categories/1')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when invalid token is provided', (done) => {
      request(app)
        .delete('/api/v1/categories/1')
        .set({ 'x-access-token': 'bajjlkall' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return status code 401 when token valid but unauthorized', (done) => {
      request(app)
        .delete('/api/v1/categories/1')
        .set({ 'x-access-token': userToken })
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'You must be an admin to perform this operation');
          done();
        });
    });
    it('should return status code 404  when categoryId is not found', (done) => {
      request(app)
        .delete('/api/v1/categories/10000000')
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Category Not Found');
          done();
        });
    });
    it('should return status code 200 and delete a category when categoryId is found', (done) => {
      request(app)
        .delete(`/api/v1/categories/${createdCategoryId}`)
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Category deleted');
          done();
        });
    });
  });
});
