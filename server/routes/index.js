import { usersController, booksController,
  categoryController, borrowController } from '../controllers';

const authMiddleware = require('../middleware/auth');

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).send({
      message: 'Welcome to the hellobooks API!',
    }));

  router.route('/users/signup')
    .post(usersController.create);

  router.route('/users/signin')
    .post(usersController.login);

  router.route('/users')
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin, usersController.list);

  router.route('/books')
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.create)
    .get(authMiddleware.verifyToken, booksController.list);

  router.route('/books/:bookId')
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.update);

  router.route('/users/:userId/books')
    .post(authMiddleware.verifyToken, borrowController.create)
    .get(authMiddleware.verifyToken, borrowController.borrowsByUser)
    .put(authMiddleware.verifyToken, borrowController.returnBook);

  router.route('/categories')
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.create)
    .get(authMiddleware.verifyToken, categoryController.list);

  router.route('/:categoryId/books')
    .get(authMiddleware.verifyToken, booksController.listCatBook);

  router.route('/categories/:categoryId')
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.update)
    .delete(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.destroy);
};

export default routes;
