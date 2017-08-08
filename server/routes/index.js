const usersController = require('../controllers').users;
const booksController = require('../controllers').books;
const categoryController = require('../controllers').categories;
const bookCategoryController = require('../controllers').bookcategory;
const authorController = require('../controllers').author;
const borrowController = require('../controllers').borrow;
const authMiddleware = require('../middleware/auth');

module.exports = (app) => {
  app.get('/api/users', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.login);

  app.post('/api/books', authMiddleware.verifyToken, booksController.create);
  app.get('/api/books', authMiddleware.verifyToken, booksController.list);
  app.put('/api/books/:bookId', booksController.update);

  app.post('/api/categories', categoryController.create);
  app.get('/api/categories', categoryController.list);
  app.put('/api/categories/:categoryId', categoryController.update);
  app.delete('/api/categories/:categoryId', categoryController.destroy);

  app.post('/api/author', authorController.create);
  app.get('/api/author', authorController.list);
  app.put('/api/author/:authorId', authorController.update);

  app.get('/api/bookcategories', bookCategoryController.list);

  app.post('/api/users/borrow', authMiddleware.verifyToken, borrowController.create);
};
