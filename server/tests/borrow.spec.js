import request from 'supertest';
import chai from 'chai';
import jwtDecode from 'jwt-decode';
import app from './../app';
import seeder from './seeder/authSeed';
import categoryseeder from './seeder/categorySeed';
import bookseeder from './seeder/bookSeed';
import borrowSeeder from './seeder/borrowSeed';


const assert = chai.assert;

require('dotenv').config();

describe('TEST BORROW ROUTES', () => {
  let userId;
  let adminId;
  before(borrowSeeder.emptyBorrowTable);
  before(seeder.emptyUserTable);
  before(bookseeder.emptyBookTable);
  before(categoryseeder.emptyCategoryTable);
  before(seeder.addUserToDb);
  before(seeder.addUserToDb2);
  before(seeder.addAdminToDb);
  before(categoryseeder.addCategoryToDb);
  before(bookseeder.addBookToDb);
  before(bookseeder.addBookToDb1);
  before(bookseeder.addBookToDb2);

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
        adminId = jwtDecode(adminToken).id;
        done();
      });
  });

  let createdBookId1; // store bookId
  before((done) => {
    request(app)
      .post('/api/v1/books')
      .set({ 'x-access-token': adminToken })
      .send({
        bookName: 'Brave Heartles',
        author: 'Towns Jnr',
        categoryId: 1,
        publishYear: new Date('1991/08/06'),
        isbn: 'ISBN43333734',
        pages: 706,
        bookCount: 9,
        bookContent: 'reads.pdf',
        bookImage: 'braves.jpg',
        description: 'Inspiring story of a young foolish barbarian'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        createdBookId1 = res.body.book.id;
        done();
      });
  });

  // update book
  before((done) => {
    request(app)
      .put(`/api/v1/books/${createdBookId1}`)
      .set({ 'x-access-token': adminToken })
      .send({
        bookName: 'Brave Heartles',
        author: 'Towns Jnr',
        categoryId: 1,
        publishYear: new Date('1991/08/06'),
        isbn: 'ISBN43333734',
        pages: 706,
        bookCount: 9,
        bookContent: 'reads.pdf',
        bookImage: 'braves.jpg',
        description: 'Inspiring story of a young foolish barbarian',
        isAvailable: false
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        createdBookId1 = res.body.update.id;
        done();
      });
  });

  // Get all books
  let createdBookId2; // store bookId
  let createdBookId3; // store bookId
  let createdBookId4; // store bookId
  before((done) => {
    request(app)
      .get('/api/v1/books')
      .set({ 'x-access-token': userToken || adminToken })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        createdBookId2 = res.body.books[0].id;
        createdBookId3 = res.body.books[1].id;
        createdBookId4 = res.body.books[2].id;
        done();
      });
  });


  let userId2; // store userId
  before((done) => {
    request(app)
      .get('/api/v1/users')
      .set({ 'x-access-token': adminToken })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        userId2 = res.body.users[1].id;
        done();
      });
  });

  // Borrow book
  before((done) => {
    request(app)
      .post(`/api/v1/users/${userId2}/books`)
      .set({ 'x-access-token': userToken })
      .send({ bookId: createdBookId4 })
      .send({})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  // Get all borrowed books
  let borrowId; // store borrowId
  before((done) => {
    request(app)
      .get('/api/v1/users/books/borrows')
      .set({ 'x-access-token': adminToken })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        borrowId = res.body.borrowers[0].id;
        done();
      });
  });

  // Test for borrow books
  describe('test for POST /users/:userId/books when borrowing books', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: createdBookId2 })
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
          .post(`/api/v1/users/${userId}/books`)
          .set({ 'x-access-token': 'xxddghj' })
          .send({ bookId: createdBookId2 })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it('should return status code 404 when book ID is not found', (done) => {
      request(app)
        .post(`/api/v1/users/${userId}/books`)
        .set({ 'x-access-token': userToken })
        .send({ bookId: 0 })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Book not found');
          done();
        });
    });
    it('should return status code 404 when book is not available', (done) => {
      request(app)
        .post(`/api/v1/users/${userId}/books`)
        .set({ 'x-access-token': userToken })
        .send({ bookId: createdBookId1 })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Book not available');
          done();
        });
    });
    it('should return status code 404 when all books have been borrowed',
      (done) => {
        request(app)
          .post(`/api/v1/users/${userId}/books`)
          .set({ 'x-access-token': userToken })
          .send({ bookId: createdBookId2 })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'All books have been borrowed');
            done();
          });
      });
    it('should return status code 200 when a book is borrowed successfully',
      (done) => {
        request(app)
          .post(`/api/v1/users/${userId}/books`)
          .set({ 'x-access-token': userToken })
          .send({ bookId: createdBookId3 })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Borrow completed');
            assert.equal(res.body.updated.id, `${createdBookId3}`);
            done();
          });
      });
  });

  // Test for borrow confirmation
  describe('test for PATCH /borrows/:borrowId/confirm when ' +
    'confirming borrows made', () => {
    it('should return status code 401 when no token is provide', (done) => {
      request(app)
        .patch(`/api/v1/borrows/0/confirm`)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when invalid token is provided',
      (done) => {
        request(app)
          .patch(`/api/v1/borrows/0/confirm`)
          .set({ 'x-access-token': 'mmmjnjkk' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it('should return status code 403 when token valid but unauthorised',
      (done) => {
        request(app)
          .patch(`/api/v1/borrows/0/confirm`)
          .set({ 'x-access-token': userToken })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message,
              'You must be an admin to perform this operation');
            done();
          });
      });
    it('should return status code 404 when borrowId does not exist', (done) => {
      request(app)
        .patch(`/api/v1/borrows/0/confirm`)
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Borrow not found');
          done();
        });
    });
    it('should return status code 200 when a borrow is confirmed', (done) => {
      request(app)
        .patch(`/api/v1/borrows/${borrowId}/confirm`)
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const {
            collectionDate,
            expectedReturn,
            borrowStatus
          } = res.body.acceptBorrow;
          assert.equal(res.body.message, 'Borrow confirmed');
          assert.equal(res.body.acceptBorrow.collectionDate, collectionDate);
          assert.equal(res.body.acceptBorrow.borrowStatus, borrowStatus);
          assert.equal(res.body.acceptBorrow.expectedReturn, expectedReturn);
          done();
        });
    });
  });

  // Test for return book
  describe('test for PUT /users/:userId/books when returning book', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .put(`/api/v1/users/${userId}/books`)
        .send({ bookId: createdBookId4 })
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
          .put(`/api/v1/users/${userId}/books`)
          .set({ 'x-access-token': 'xxddghj' })
          .send({ bookId: createdBookId4 })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it('should return status code 404 when book ID is not found', (done) => {
      request(app)
        .put(`/api/v1/users/${userId}/books`)
        .set({ 'x-access-token': userToken })
        .send({ bookId: 0 })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Book not found');
          done();
        });
    });
    it('should return status code 200 when returning book', (done) => {
      request(app)
        .put(`/api/v1/users/${userId2}/books`)
        .set({ 'x-access-token': userToken })
        .send({ bookId: createdBookId4 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'return completed');
          assert.equal(res.body.updateBook.id, `${createdBookId4}`);
          done();
        });
    });
    it('should return status code 400 when book is returned already',
      (done) => {
        request(app)
          .put(`/api/v1/users/${userId2}/books`)
          .set({ 'x-access-token': userToken })
          .send({ bookId: createdBookId4 })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Book already returned');
            done();
          });
      });
  });

  // Test for return confirmation
  describe('test for PUT /borrows/:borrowId/confirm ' +
    'when confirming borrows made', () => {
    it('should return status code 401 when no token is provide', (done) => {
      request(app)
        .put(`/api/v1/borrows/0/confirm`)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'No authorization token provided');
          done();
        });
    });
    it('should return status code 401 when invalid token is provided',
      (done) => {
        request(app)
          .put(`/api/v1/borrows/0/confirm`)
          .set({ 'x-access-token': 'mmmjnjkk' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it('should return status code 403 when token valid but unauthorised',
      (done) => {
        request(app)
          .put(`/api/v1/borrows/0/confirm`)
          .set({ 'x-access-token': userToken })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message,
              'You must be an admin to perform this operation');
            done();
          });
      });
    it('should return status code 404 when borrowId does not exist', (done) => {
      request(app)
        .put(`/api/v1/borrows/0/confirm`)
        .set({ 'x-access-token': adminToken })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Borrow not found');
          done();
        });
    });
    it('should return status code 200 when a return is confirmed', (done) => {
      request(app)
        .put(`/api/v1/borrows/${borrowId}/confirm`)
        .set({ 'x-access-token': adminToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const {
            actualReturn,
            returned
          } = res.body.acceptReturn;
          // const actualReturn = res.body.acceptReturn.actualReturn;
          // const returned = res.body.acceptReturn.returned;
          assert.equal(res.body.message, 'Return confirmed');
          assert.equal(res.body.acceptReturn.actualReturn, actualReturn);
          assert.equal(res.body.acceptReturn.returned, returned);
          done();
        });
    });
  });

  // Test to get borrows made by a single user
  describe('test for GET /users/:userId/books single user borrow', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .get(`/api/v1/users/${userId}/books`)
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
          .get(`/api/v1/users/${userId}/books`)
          .set({ 'x-access-token': 'xxddghj' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it(`should return status code 200 when books
     borrowed a user is got successfully`,
      (done) => {
        request(app)
          .get(`/api/v1/users/${userId}/books?owe='false'`)
          .set({ 'x-access-token': userToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.borrowed[1].userId, userId);
            done();
          });
      });
  });

  // Test to get borrows made on app
  describe('test for GET /users/books/borrows single user borrow', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .get(`/api/v1/users/books/borrows`)
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
          .get(`/api/v1/users/books/borrows`)
          .set({ 'x-access-token': 'xxddghj' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it(`should return status code 403 when token valid but unauthorised`,
      (done) => {
        request(app)
          .get(`/api/v1/users/books/borrows`)
          .set({ 'x-access-token': userToken })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message,
              'You must be an admin to perform this operation');
            done();
          });
      });
    it(`should return status code 200 when
     all borrows made is gotten successful`,
      (done) => {
        request(app)
          .get(`/api/v1/users/books/borrows`)
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.borrowers[0].userId, userId2);
            assert.equal(res.body.borrowers[1].userId, userId);
            done();
          });
      });
  });


  // Test to get all books returned made on app
  describe('test for GET /users/books/returned single user borrow', () => {
    it('should return status code 401 when no token is provided', (done) => {
      request(app)
        .get(`/api/v1/users/books/returned`)
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
          .get(`/api/v1/users/books/returned`)
          .set({ 'x-access-token': 'xxddghj' })
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'Invalid authorization token');
            done();
          });
      });
    it(`should return status code 403 when token valid but unauthorised`,
      (done) => {
        request(app)
          .get(`/api/v1/users/books/returned`)
          .set({ 'x-access-token': userToken })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message,
              'You must be an admin to perform this operation');
            done();
          });
      });
    it(`should return status code 200 when
     all books returned made is gotten successful`,
      (done) => {
        request(app)
          .get(`/api/v1/users/books/returned`)
          .set({ 'x-access-token': adminToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.returners[0].userId, userId2);
            done();
          });
      });
  });
});