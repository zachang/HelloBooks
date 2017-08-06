const usersController = require('../controllers').users;
const booksController = require('../controllers').books;
const categoryController = require('../controllers').categories;

module.exports = (app) => {
  app.get('/api/users', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.login);

  app.post('/api/books', booksController.create);
  app.get('/api/books', booksController.list);
  app.put('/api/books/:bookId', booksController.update);

  app.post('/api/categories', categoryController.create);
  app.get('/api/categories', booksController.list);
};
