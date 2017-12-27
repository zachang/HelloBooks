import { usersController, booksController,
  categoryController, borrowController } from '../controllers';

const authMiddleware = require('../middleware/auth');

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).send({
      message: 'Welcome to the hellobooks API!',
    }));

  /**
   * @swagger
   * /api/v1/users/signup:
   *   post:
   *     tags:
   *       - User
   *     description: Create user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: fullname
   *         description: User's fullname.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: username
   *         description: User's username.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: User's email
   *         in: formData
   *         required: true
   *         type: string
   *       - name: phone_no
   *         description: User's phone number
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password_confirmation
   *         description: User's password confirmation
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       201:
   *        description: User Successfully created
   *       400:
   *        description: User not created
   */
  router.route('/users/signup')
    .post(usersController.create);

  /**
   * @swagger
   * /api/v1/users/signin:
   *   post:
   *     tags:
   *       - User
   *     description: login user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: User's username.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *        description: Successful login
   *       404:
   *        description: Invalid credentials
   */
  router.route('/users/signin')
    .post(usersController.login);

  /**
   * @swagger
   * /api/v1//users:
   *   get:
   *     tags:
   *       - User
   *     description: Display all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Display all users
   *       401:
   *         description: No authorization token provided
   */
  router.route('/users')
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin, usersController.list);

  router.route('/users/:userId')
    .get(authMiddleware.verifyToken, usersController.listOne)
    .put(authMiddleware.verifyToken, usersController.update);

  router.route('/books')
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.create)
    .get(authMiddleware.verifyToken, booksController.list);

  router.route('/books/:bookId')
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.update)
    .get(authMiddleware.verifyToken, booksController.listOne)
    .delete(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.destroy);

  router.route('/users/:userId/books')
    .post(authMiddleware.verifyToken, borrowController.create)
    .get(authMiddleware.verifyToken, borrowController.borrowsByUser)
    .put(authMiddleware.verifyToken, borrowController.returnBook);

  router.route('/users/books/borrows')
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin,
      borrowController.borrowsViewByAdmin);

  router.route('/users/books/returned')
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin,
      borrowController.returnsViewByAdmin);

  router.route('/categories')
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.create)
    .get(authMiddleware.verifyToken, categoryController.list);

  router.route('/categories/:categoryId')
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.update)
    .delete(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.destroy);

  router.route('/borrows/:borrowId/confirm')
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, borrowController.acceptReturns)
    .patch(authMiddleware.verifyToken, authMiddleware.verifyAdmin, borrowController.acceptBorrows);
};

export default routes;