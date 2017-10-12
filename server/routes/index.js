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
   *         in: body
   *         required: true
   *         type: string
   *       - name: username
   *         description: User's username.
   *         in: body
   *         required: true
   *         type: string
   *       - name: email
   *         description: User's email
   *         in: body
   *         required: true
   *         type: string
   *       - name: phone_no
   *         description: User's phone number
   *         in: body
   *         required: true
   *         type: string
   *       - name: user_image
   *         description: User's profile image
   *         in: body
   *         required: true
   *         type: string
   *       - name: is_admin
   *         description: User's role
   *         in: body
   *         required: true
   *         type: boolean
   *       - name: block_status
   *         description: User's restriction
   *         in: body
   *         required: true
   *         type: boolean
   *       - name: level
   *         description: User's plan
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *        description: Successfully created
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
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *        description: Successful login
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
   */
  router.route('/users')
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin, usersController.list);

  router.route('/books')
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.create)
    .get(authMiddleware.verifyToken, booksController.list);

  router.route('/books/:bookId')
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.update)
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.listOne)
    .delete(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.destroy);

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
