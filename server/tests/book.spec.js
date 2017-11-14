import request from 'supertest';
import chai from 'chai';
import app from './../app';
import seeder from './seeder/auth_seed';
import categoryseeder from './seeder/category_seed';
import bookseeder from './seeder/book_seed';

process.env.NODE_ENV = 'test';

const assert = chai.assert;

require('dotenv').config();

// Test for books POST route
describe('TEST BOOK ROUTES', () => {
  let createdBookId;
  let createdCategoryId;
  before(seeder.emptyUserTable);
  before(bookseeder.emptyBookTable);
  before(categoryseeder.emptyCategoryTable);
  before(seeder.addUserToDb);
  before(seeder.addAdminToDb);
  before(categoryseeder.addCategoryToDb);
  before(bookseeder.addBookToDb);

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

  describe('POST api/v1/books when creating books', () => {
    describe('test for empty, valid and invalid token when creating a book', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(app)
          .post('/api/v1/books')
          .send(bookseeder.setBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', 'Inspiring story of a young scottish barbarian'))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
      it('should return status code 401 when invalid token is provided', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': 'bajjlkall' })
          .send(bookseeder.setBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png'))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
      it('should return status code 401 when token valid but unauthorised', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': userToken })
          .send(bookseeder.setBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png'))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You must be an admin to perform this operation');
            done();
          });
      });
      it('should return status code 201 and create book when token valid and authorised', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', 'Inspiring story of a young scottish barbarian'))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            createdBookId = res.body.book.id;
            createdCategoryId = res.body.book.category_id;
            assert.equal(res.body.message, 'Book created');
            done();
          });
      });
    });

    describe('test for incomplete book details', () => {
      it('should return status code 400 when token valid and authorised but with no book inputs', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('', '', '', '', '', '', '', '', ''))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            done();
          });
      });
      it('should return status code 400 when book_name input missing', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('', 'Michel Pat', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.book_name[0], 'The book name field is required.');
            done();
          });
      });
      it('should return status code 400 when author input missing', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Hamlet', '', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.author[0], 'The author field is required.');
            done();
          });
      });
      it('should return status code 400 when category_id input missing', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Hamlet', 'Michel Pat', '', new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.category_id[0], 'The category id field is required.');
            done();
          });
      });
      it('should return status code 400 when book_count input missing', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Hamlet', 'Michel Pat', 1, new Date('1991/08/06'), 'ISBN88889999', 679, '', 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.book_count[0], 'The book count field is required.');
            done();
          });
      });
    });

    describe('test for typeof and required length of some book details', () => {
      it('should return status code 400 if book_name length < 2', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Y', 'Michel Pat', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 5, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.book_name[0], 'The book name must be at least 2 characters.');
            done();
          });
      });
      it('should return status code 400 if book_name input not string', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData(756, 'Michel Pat', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 5, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.book_name[0], 'The book name must be a string.');
            done();
          });
      });
      it('should return status code 400 if author length < 2', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Yi Moon', 'M', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 5, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.author[0], 'The author must be at least 2 characters.');
            done();
          });
      });
      it('should return status code 400 if author input not string', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('Yi Mon', 98, 3, new Date('1991/08/06'), 'ISBN88889999', 679, 5, 'koon.png', 'Inspiring story of a young scottish barbarian'))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.author[0], 'The author must be a string.');
            done();
          });
      });
    });
  });// POST route for books

  // Test for books GET route
  describe('test for GET api/v1/books when viewing books', () => {
    it('should return status code 401 when user wants to view all books with invalid token', (done) => {
      request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': 'xxddghj' })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid authorization token');
          done();
        });
    });
    it('should return status code 401 when user wants to view all books without token', (done) => {
      request(app)
        .get('/api/v1/books')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 200 when user wants to view all books with valid token', (done) => {
      request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': userToken || adminToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'All books displayed');
          assert.exists(res.body.books);
          assert.isArray(res.body.books);
          done();
        });
    });
    it('should return status code 400 when user wants to view all books belonging to a non existing category', (done) => {
      request(app)
        .get('/api/v1/5/books')
        .set({ 'x-access-token': userToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Category not found');
          done();
        });
    });
    it('should return status code 200 when user wants to view all books belonging to a category', (done) => {
      request(app)
        .get(`/api/v1/${createdCategoryId}/books`)
        .set({ 'x-access-token': userToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'All books displayed by category');
          done();
        });
    });
    it('should return status code 404 when user wants to view all books belonging to a category with no books', (done) => {
      request(app)
        .get('/api/v1/2/books')
        .set({ 'x-access-token': userToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No books for this category');
          done();
        });
    });
  });// GET route for books

  // Test for books PUT route
  describe('PUT api/v1/books/:bookId when updating books', () => {
    describe('test for empty, valid and invalid token when updating a book', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(app)
          .put('/api/v1/books/1')
          .send(bookseeder.setUpdateBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', false))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
      it('should return status code 401 when invalid token is provided', (done) => {
        request(app)
          .put('/api/v1/books/1')
          .set({ 'x-access-token': 'bajjlkall' })
          .send(bookseeder.setUpdateBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', true))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
      it('should return status code 404  when bookId is not found', (done) => {
        request(app)
          .put('/api/v1/books/10000000')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setUpdateBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', 'Inspiring story of a young scottish barbarian', true))
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Book Not Found');
            done();
          });
      });
      it('should return status code 404 when bookId is not provided', (done) => {
        request(app)
          .put('/api/v1/books/')
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setUpdateBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', true))
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, undefined);
            done();
          });
      });
      it('should return status code 401 when token valid but user unauthorised', (done) => {
        request(app)
          .put('/api/v1/books/1')
          .set({ 'x-access-token': userToken })
          .send(bookseeder.setUpdateBookData('Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koo.png', true))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You must be an admin to perform this operation');
            done();
          });
      });
      it('should return status code 200 when token valid, bookId found and user authorised then update book', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setUpdateBookData('Harry Mack', 'Michel Patts', 1, new Date('1991/08/06'), 'ISBN88889999', 679, 3, 'koons.png', 'Inspiring story of a young scottish barbarian', false))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Books updated');
            assert.exists(res.body.book);
            done();
          });
      });
    });
    describe('test for incomplete update details', () => {
      it('should return status code 400 when all book update inputs missing', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .set({ 'x-access-token': adminToken })
          .send(bookseeder.setBookData('', '', '', '', '', '', '', '', ''))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            done();
          });
      });
    });
  });// PUT route for books
});

