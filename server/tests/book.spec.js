import request from 'supertest';
import chai from 'chai';
import app from './../app';
import seeder from './seeder/authSeed';
import categoryseeder from './seeder/categorySeed';
import bookseeder from './seeder/bookSeed';

process.env.NODE_ENV = 'test';

const assert = chai.assert;

require('dotenv').config();

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
      .send(seeder.setLoginData('ebenezer', 'twinkle'))
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
      .send(seeder.setLoginData('ebenez', 'twinkle'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        adminToken = res.body.token;
        done();
      });
  });

  // Test for book creation
  describe('POST api/v1/books when creating books', () => {
    describe('test for empty, valid and invalid token when creating a book', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(app)
          .post('/api/v1/books')
          .send(bookseeder.setBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png',
            'Inspiring story of a young scottish barbarian'
          ))
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
          .set({'x-access-token': 'bajjlkall'})
          .send(bookseeder.setBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png'
          ))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
      it('should return status code 403 when token valid but unauthorised', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({'x-access-token': userToken})
          .send(bookseeder.setBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png'
          ))
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You must be an admin to perform this operation');
            done();
          });
      });
      it('should return status code 201 and create book when token valid and authorised', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png',
            'Inspiring story of a young scottish barbarian'
          ))
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            createdBookId = res.body.book.id;
            createdCategoryId = res.body.book.categoryId;
            assert.equal(res.body.message, 'Book created');
            assert.equal(res.body.book.bookName, 'Harry Mac');
            assert.equal(res.body.book.author, 'Michel Patt');
            assert.equal(res.body.book.categoryId, 1);
            assert.equal(res.body.book.isbn, 'ISBN88889999');
            assert.equal(res.body.book.pages, 679);
            assert.equal(res.body.book.bookCount, 3);
            assert.equal(res.body.book.bookContent, 'foo.pdf');
            assert.equal(res.body.book.bookImage, 'koo.png');
            assert.equal(res.body.book.description, 'Inspiring story of a young scottish barbarian');
            done();
          });
      });
    });

    describe('test for incomplete book details', () => {
      it('should return status code 400 when token valid and authorised but with no book inputs', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData('', '', '', '', '', '', '', '', '', ''))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.bookName[0], 'The bookName field is required.');
            assert.equal(res.body.errors.author[0], 'The author field is required.');
            assert.equal(res.body.errors.categoryId[0], 'The categoryId field is required.');
            assert.equal(res.body.errors.bookCount[0], 'The bookCount field is required.');
            assert.equal(res.body.errors.bookContent[0], 'The bookContent field is required.');
            assert.equal(res.body.errors.publishYear[0], 'The publishYear field is required.');
            assert.equal(res.body.errors.isbn[0], 'The isbn field is required.');
            assert.equal(res.body.errors.pages[0], 'The pages field is required.');
            assert.equal(res.body.errors.description[0], 'The description field is required.');
            done();
          });
      });
    });

    describe('test for typeof and required length of some book details', () => {
      it('should return status code 400 if bookName length < 2', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData(
            'Y', 'Michel Pat', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 5, 'foo.pdf', 'koon.png',
            'Inspiring story of a young scottish barbarian'
          ))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.bookName[0], 'The bookName must be at least 2 characters.');
            done();
          });
      });
      it('should return status code 400 if bookName input not string', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData(
            756, 'Michel Pat', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 5, 'foo.pdf', 'koon.png',
            'Inspiring story of a young scottish barbarian'
          ))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.bookName[0], 'The bookName must be a string.');
            done();
          });
      });
      it('should return status code 400 if author length < 2', (done) => {
        request(app)
          .post('/api/v1/books')
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData(
            'Yi Moon', 'M', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 5, 'koon.png',
            'Inspiring story of a young scottish barbarian'
          ))
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
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData(
            'Yi Mon', 98, 3, new Date('1991/08/06'),
            'ISBN88889999', 679, 5, 'koon.png',
            'Inspiring story of a young scottish barbarian'
          ))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.errors.author[0], 'The author must be a string.');
            done();
          });
      });
    });
  });

  // Test for book list
  describe('test for GET api/v1/books when viewing books', () => {
    it('should return status code 401 when user wants to view all books with invalid token', (done) => {
      request(app)
        .get('/api/v1/books')
        .set({'x-access-token': 'xxddghj'})
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
        .set({'x-access-token': userToken || adminToken})
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'All books displayed');
          assert.equal(res.body.books[0].bookName, 'Brave Heart');
          assert.equal(res.body.books[0].author, 'Townsend Jnr');
          assert.equal(res.body.books[0].categoryId, 1);
          assert.equal(res.body.books[0].isbn, 'ISBN43333334');
          assert.equal(res.body.books[0].pages, 506);
          assert.equal(res.body.books[0].bookCount, 2);
          assert.equal(res.body.books[0].bookContent, 'read.pdf');
          assert.equal(res.body.books[0].bookImage, 'brave.jpg');
          assert.equal(res.body.books[0].description, 'Inspiring story of a young scottish barbarian');
          assert.isArray(res.body.books);
          done();
        });
    });
  });// GET route for books

  // Test for book update
  describe('PUT api/v1/books/:bookId when updating books', () => {
    describe('test for empty, valid and invalid token when updating a book', () => {
      it('should return status code 401 when no token is provided', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .send(bookseeder.setUpdateBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png', false
          ))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
      it('should return status code 401 when invalid token is provided', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .set({'x-access-token': 'bajjlkall'})
          .send(bookseeder.setUpdateBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png', true
          ))
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
      it('should return status code 404 when bookId is not found', (done) => {
        request(app)
          .put('/api/v1/books/0')
          .set({'x-access-token': adminToken})
          .send(bookseeder.setUpdateBookData(
            'Harry Mac', 'Michel Patt', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koo.png',
            'Inspiring story of a young scottish barbarian', true
          ))
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
          .set({'x-access-token': adminToken})
          .send(bookseeder.setUpdateBookData(
            'Harry Mac', 'Michel Patt', 1,
            new Date('1991/08/06'), 'ISBN88889999',
            679, 3, 'foo.pdf', 'koo.png', true
          ))
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, undefined);
            done();
          });
      });
      it('should return status code 401 when token valid but user unauthorised', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .set({'x-access-token': userToken})
          .send(bookseeder.setUpdateBookData(
            'Harry Mac', 'Michel Patt', 1,
            new Date('1991/08/06'), 'ISBN88889999',
            679, 3, 'foo.pdf', 'koo.png', true
          ))
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You must be an admin to perform this operation');
            done();
          });
      });
      it('should return status code 200 when token valid, bookId found and user authorised then update book', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .set({'x-access-token': adminToken})
          .send(bookseeder.setUpdateBookData(
            'Harry Mack', 'Michel Patts', 1, new Date('1991/08/06'),
            'ISBN88889999', 679, 3, 'foo.pdf', 'koons.png',
            'Inspiring story of a young scottish barbarian', false
          ))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Books updated');
            assert.equal(res.body.update.bookName, 'Harry Mack');
            assert.equal(res.body.update.author, 'Michel Patts');
            assert.equal(res.body.update.categoryId, 1);
            assert.equal(res.body.update.isbn, 'ISBN88889999');
            assert.equal(res.body.update.pages, 679);
            assert.equal(res.body.update.bookCount, 3);
            assert.equal(res.body.update.bookContent, 'foo.pdf');
            assert.equal(res.body.update.bookImage, 'koons.png');
            assert.equal(res.body.update.description, 'Inspiring story of a young scottish barbarian');
            assert.equal(res.body.update.isAvailable, false);
            done();
          });
      });
    });
    describe('test for incomplete update details', () => {
      it('should return status code 400 when all book update inputs missing', (done) => {
        request(app)
          .put(`/api/v1/books/${createdBookId}`)
          .set({'x-access-token': adminToken})
          .send(bookseeder.setBookData('', '', '', '', '', '', '', '', '', '', ''))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.message, 'Validation error');
            assert.equal(res.body.errors.bookName[0], 'The bookName field is required.');
            assert.equal(res.body.errors.author[0], 'The author field is required.');
            assert.equal(res.body.errors.categoryId[0], 'The categoryId field is required.');
            assert.equal(res.body.errors.bookCount[0], 'The bookCount field is required.');
            assert.equal(res.body.errors.bookContent[0], 'The bookContent field is required.');
            assert.equal(res.body.errors.publishYear[0], 'The publishYear field is required.');
            assert.equal(res.body.errors.isbn[0], 'The isbn field is required.');
            assert.equal(res.body.errors.pages[0], 'The pages field is required.');
            assert.equal(res.body.errors.description[0], 'The description field is required.');
            assert.equal(res.body.errors.isAvailable[0], 'The isAvailable field is required.');
            done();
          });
      });
    });
  });

  // Test for listing a book
  describe('test for GET api/v1/books/:bookId when viewing list of one user', () => {
    it(`should return status code 401 when a user wants to 
    access to a single book detail without token`,
      (done) => {
        request(app)
          .get(`/api/v1/books/${createdBookId}`)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
    it(`should return status code 401 when a user
        wants to access to a single book detail with invalid token`,
      (done) => {
        request(app)
          .get(`/api/v1/books/${createdBookId}`)
          .set({'x-access-token': 'xxddghj'})
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it(`should return status code 404 when a user
        wants to access to a single book detail with wrong bookId`,
      (done) => {
        request(app)
          .get(`/api/v1/books/0`)
          .set({'x-access-token': adminToken})
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Book not found');
            done();
          });
      });
    it(`should return status code 200 when a user
        wants to access to a single book detail with valid token`,
      (done) => {
        request(app)
          .get(`/api/v1/books/${createdBookId}`)
          .set({'x-access-token': adminToken})
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Book displayed');
            assert.equal(res.body.book.bookName, 'Harry Mack');
            assert.equal(res.body.book.author, 'Michel Patts');
            assert.equal(res.body.book.bookContent, 'foo.pdf');
            assert.equal(res.body.book.bookImage, 'koons.png');
            assert.equal(res.body.book.bookCount, 3);
            assert.equal(res.body.book.categoryId, 1);
            assert.equal(res.body.book.isbn, 'ISBN88889999');
            assert.equal(res.body.book.pages, '679');
            assert.equal(res.body.book.description,
              `Inspiring story of a young scottish barbarian`);
            done();
          });
      });
  });

  // Test for book delete
  describe('test for DELETE api/v1/books/:bookId when deleting a book', () => {
    it(`should return status code 401 when a user wants to 
    delete a book without token`,
      (done) => {
        request(app)
          .delete(`/api/v1/books/${createdBookId}`)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'No authorization token provided');
            done();
          });
      });
    it(`should return status code 401 when a user wants to 
      delete a book with invalid token`,
      (done) => {
        request(app)
          .delete(`/api/v1/books/${createdBookId}`)
          .set({ 'x-access-token': 'xxddghj' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it(`should return status code 403 when a user wants to 
      delete a book with unauthorised token`,
      (done) => {
        request(app)
          .delete(`/api/v1/books/${createdBookId}`)
          .set({ 'x-access-token': userToken })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'You must be an admin to perform this operation');
            done();
          });
      });
    it('should return status code 404  when bookId is not found', (done) => {
      request(app)
        .delete('/api/v1/books/0')
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Book Not Found');
          done();
        });
    });
    it(`should return status code 200 when a user wants to 
      delete a book with unauthorised token`,
      (done) => {
        request(app)
          .delete(`/api/v1/books/${createdBookId}`)
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Book deleted');
            done();
          });
      });
  });
});



