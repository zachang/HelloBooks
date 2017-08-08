import { usersController, booksController,
  categoryController } from '../controllers';

const authMiddleware = require('../middleware/auth');

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).send({
      message: 'Welcome to the hellobook API!',
    }));

  router.route('/users/signup')
    .post(usersController.create);
  router.route('/users/signin')
    .post(usersController.login);

  router.route('/books')
    .get(booksController.list)
    .post(authMiddleware.verifyToken, booksController.create);

  router.route('/books/:bookId')
    .put(authMiddleware.verifyToken, booksController.update);

  router.route('/categories')
    .get(categoryController.list)
    .post(categoryController.create);

  router.route('/categories/:categoryId')
    .put(categoryController.update)
    .delete(categoryController.destroy);

  // router.route('/users/borrow')
  //   .post(authMiddleware.verifyToken, borrowController.create);
};

export default routes;
