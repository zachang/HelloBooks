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
   *       - name: phoneNo
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
   * /api/v1/users/social:
   *   post:
   *     tags:
   *       - User
   *     description: login user via gmail
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
   *       - name: phoneNo
   *         description: User's phone number
   *         in: formData
   *         required: true
   *         type: string
   *       - name: isSocial
   *         description: check gmail login
   *         in: formData
   *         required: false
   *         type: boolean
   *       - name: regType
   *         description: User's registration type
   *         in: formData
   *         required: false
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *        description: Successful login
   *       400:
   *         description: Gmail login unsuccessful
   *       409:
   *         description: User already exist
   */
  router.route('/users/social')
    .post(usersController.googleLogin);

  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     tags:
   *       - User
   *     parameters:
   *       - name: x-access-token
   *         in: header
   *         description: authentication token
   *         required: true
   *         type: string
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
    /**
     * @swagger
     * /api/v1/users/{userId}:
     *   get:
     *     tags:
     *       - User
     *     description: display a single user
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         required: true
     *         type: string
     *         description: authentication token
     *       - name: userId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the user to return
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Display all users
     *       401:
     *         description: No authorization token provided
  */
    .get(authMiddleware.verifyToken, usersController.listOne)
    /**
     * @swagger
     * /api/v1/users/{userId}:
     *   put:
     *     tags:
     *       - User
     *     description: Update user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         required: true
     *         type: string
     *         description: authentication token
     *       - name: userId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the user to update
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
     *       - name: phoneNo
     *         description: User's phone number
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *        description: User updated
     *       400:
     *        description: Error, No update done
     */
    .put(authMiddleware.verifyToken, usersController.update);

  /**
   * @swagger
   * /api/v1/users/change-password:
   *   post:
   *     tags:
   *       - User
   *     description: Update user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         in: header
   *         required: true
   *         type: string
   *         description: authentication token
   *       - name: userId
   *         in: path
   *         required: true
   *         type: integer
   *         minimum: 1
   *         description: The ID of the user to update
   *       - name: oldPassword
   *         description: User's previous password.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: newPassword
   *         description: User's previous new password.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: newPassword_confirmation
   *         description: User's previous new password confirmation.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *        description: Password changed
   *       400:
   *        description: Password not changed
   */
  router.route('/users/change-password')
    .post(authMiddleware.verifyToken, usersController.changePassword);

  router.route('/books')
    /**
     * @swagger
     * /api/v1/books:
     *   post:
     *     tags:
     *       - Books
     *     description: Create Book
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         required: true
     *         type: string
     *         description: authentication token
     *       - name: bookName
     *         description: Book name.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: author
     *         description: Author.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: categoryId
     *         description: Book category ID
     *         in: formData
     *         required: true
     *         type: integer
     *       - name: bookCount
     *         description: Quantity of book
     *         in: formData
     *         required: true
     *         type: integer
     *       - name: bookContent
     *         description: Book file
     *         in: formData
     *         required: true
     *         type: string
     *       - name: publishYear
     *         description: Publish year of book
     *         in: formData
     *         required: true
     *         type: string
     *         format: date
     *       - name: isbn
     *         description: Book ISBN
     *         in: formData
     *         required: true
     *         type: string
     *       - name: pages
     *         description: No. of pages
     *         in: formData
     *         required: true
     *         type: string
     *       - name: description
     *         description: Book description
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *        description: Book created
     *       400:
     *        description: Validation Error
     */
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.create)
    /**
     * @swagger
     * /api/v1/books:
     *   get:
     *     tags:
     *       - Books
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *     description: Display all Books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: All books displayed
     *       401:
     *         description: No authorization token provided
     */
    .get(authMiddleware.verifyToken, booksController.list);

  router.route('/books/:bookId')
    /**
     * @swagger
     * /api/v1/books/{bookId}:
     *   put:
     *     tags:
     *       - Books
     *     description: Update Book
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         required: true
     *         type: string
     *         description: authentication token
     *       - name: bookId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the book to update
     *       - name: bookName
     *         description: Book name.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: author
     *         description: Author.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: categoryId
     *         description: Book category ID
     *         in: formData
     *         required: true
     *         type: integer
     *       - name: bookCount
     *         description: Quantity of book
     *         in: formData
     *         required: true
     *         type: integer
     *       - name: bookContent
     *         description: Book file
     *         in: formData
     *         required: true
     *         type: string
     *       - name: publishYear
     *         description: Publish year of book
     *         in: formData
     *         required: true
     *         type: string
     *         format: date
     *       - name: isbn
     *         description: Book ISBN
     *         in: formData
     *         required: true
     *         type: string
     *       - name: pages
     *         description: No. of pages
     *         in: formData
     *         required: true
     *         type: string
     *       - name: description
     *         description: Book description
     *         in: formData
     *         required: true
     *         type: string
     *       - name:  isAvailable
     *         description: Book description
     *         in: formData
     *         required: true
     *         type: boolean
     *     responses:
     *       200:
     *        description: Book created
     *       400:
     *        description: Validation Error
     *       404:
     *        description: Book not found
     */
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.update)
    /**
     * @swagger
     * /api/v1/books/{bookId}:
     *   get:
     *     tags:
     *       - Books
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: bookId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the book to retrieve
     *     description: Display a single Books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Book displayed
     *       404:
     *         description: Book not found
     *       401:
     *         description: No authorization token provided
     */
    .get(authMiddleware.verifyToken, booksController.listOne)
    /**
     * @swagger
     * /api/v1/books/{bookId}:
     *   delete:
     *     tags:
     *       - Books
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: bookId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the book to be deleted
     *     description: Delete Book
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Book deleted
     *       400:
     *         description: Error, No deletion occurred
     *       404:
     *         description: Book not found
     *       401:
     *         description: No authorization token provided
     */
    .delete(authMiddleware.verifyToken, authMiddleware.verifyAdmin, booksController.destroy);

  router.route('/users/:userId/books')
    /**
     * @swagger
     * /api/v1/users/{userId}/books:
     *   post:
     *     tags:
     *       - Borrow
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: userId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the user who wants to borrow
     *       - name: bookId
     *         description: Book ID.
     *         in: formData
     *         required: true
     *         type: integer
     *     description: Display a single book
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Borrow completed
     *       400:
     *         description: You have not returned the previous book you borrowed
     *       404:
     *         description: Book not found
     *       401:
     *         description: No authorization token provided
     */
    .post(authMiddleware.verifyToken, borrowController.create)
    /**
     * @swagger
     * /api/v1/users/{userId}/books:
     *   get:
     *     tags:
     *       - Borrow
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: userId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the user who wants to retrieve his/her borrow details
     *     description: Display a single book
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Borrow displayed
     *       401:
     *         description: No authorization token provided
     */
    .get(authMiddleware.verifyToken, borrowController.borrowsByUser)
    /**
     * @swagger
     * /api/v1/users/{userId}/books:
     *   put:
     *     tags:
     *       - Returned
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: userId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the user who wants to borrow
     *       - name: bookId
     *         description: Book ID.
     *         in: formData
     *         required: true
     *         type: integer
     *     description: Display a single book
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Return completed
     *       400:
     *         description: Book already returned
     *       404:
     *         description: Book not found
     *       401:
     *         description: No authorization token provided
     */
    .put(authMiddleware.verifyToken, borrowController.returnBook);

  router.route('/users/books/borrows')
    /**
     * @swagger
     * /api/v1/users/books/borrows:
     *   get:
     *     tags:
     *       - Borrowed
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *     description: Display all borrowed books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: All borrows displayed
     *       401:
     *         description: No authorization token provided
     */
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin,
      borrowController.borrowsViewByAdmin);

  router.route('/users/books/returned')
    /**
     * @swagger
     * /api/v1/users/books/returned:
     *   get:
     *     tags:
     *       - Returned
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *     description: Display all returned books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: All returned displayed
     *       401:
     *         description: No authorization token provided
     */
    .get(authMiddleware.verifyToken, authMiddleware.verifyAdmin,
      borrowController.returnsViewByAdmin);

  router.route('/categories')
    /**
     * @swagger
     * /api/v1/categories:
     *   post:
     *     tags:
     *       - Category
     *     description: Create Categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         required: true
     *         type: string
     *         description: authentication token
     *       - name: categoryName
     *         description: Category Name
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       201:
     *        description: Category created
     *       400:
     *        description: Validation error
     *       401:
     *         description: No authorization token provided
     */
    .post(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.create)
    /**
     * @swagger
     * /api/v1/categories:
     *   get:
     *     tags:
     *       - Category
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *     description: Display Categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: All categories displayed
     *       400:
     *         description: Error, no category to display
     */
    .get(authMiddleware.verifyToken, categoryController.list);

  router.route('/categories/:categoryId')
    /**
     * @swagger
     * /api/v1/categories/{categoryId}:
     *   put:
     *     tags:
     *       - Category
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: categoryId
     *         description: The ID of the Category to be retrieved
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *       - name: categoryName
     *         description: Category Name
     *         in: formData
     *         required: true
     *         type: string
     *     description: Update a category
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Category updated
     *       400:
     *         description: Validation error
     *       404:
     *         description: Category Not Found
     *       401:
     *         description: No authorization token provided
     */
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.update)
    /**
     * @swagger
     * /api/v1/categories/{categoryId}:
     *   delete:
     *     tags:
     *       - Category
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: categoryId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *         description: The ID of the category to be deleted
     *     description: Delete category
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Category deleted
     *       400:
     *         description: Error, No deletion occurred
     *       404:
     *         description: Category Not Found
     *       401:
     *         description: No authorization token provided
     */
    .delete(authMiddleware.verifyToken, authMiddleware.verifyAdmin, categoryController.destroy);

  router.route('/borrows/:borrowId/confirm')
    /**
     * @swagger
     * /api/v1/borrows/{borrowId}/confirm:
     *   put:
     *     tags:
     *       - Returned
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: borrowId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *     description: Confirm borrowed books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Return confirmed
     *       404:
     *         description: Borrow not found
     *       401:
     *         description: No authorization token provided
     */
    .put(authMiddleware.verifyToken, authMiddleware.verifyAdmin, borrowController.acceptReturns)
    /**
     * @swagger
     * /api/v1/borrows/{borrowId}/confirm:
     *   patch:
     *     tags:
     *       - Borrow
     *     parameters:
     *       - name: x-access-token
     *         in: header
     *         description: authentication token
     *         required: true
     *         type: string
     *       - name: borrowId
     *         in: path
     *         required: true
     *         type: integer
     *         minimum: 1
     *     description: Confirm borrowed books
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Borrow confirmed
     *       404:
     *         description: Borrow not found
     *       401:
     *         description: No authorization token provided
     */
    .patch(authMiddleware.verifyToken, authMiddleware.verifyAdmin, borrowController.acceptBorrows);
};

export default routes;