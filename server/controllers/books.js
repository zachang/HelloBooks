import Validator from 'validatorjs';
import { generatePaginationMeta } from '../utils/helpers';
import db from '../models';

const Book = db.Book;
const Category = db.Category;

const addBookRules = {
  bookName: 'required|string|min:2',
  author: 'required|string|min:2',
  categoryId: 'required|min:1',
  bookCount: 'required|min:1',
  bookContent: 'required',
  publishYear: 'required',
  isbn: 'required',
  pages: 'required',
  description: 'required|string|min:15'
};

const updateBookRules = {
  bookName: 'required|string|min:2',
  author: 'required|string|min:2',
  categoryId: 'required|min:1',
  publishYear: 'required',
  bookContent: 'required',
  isbn: 'required',
  pages: 'required',
  bookCount: 'required|min:1',
  description: 'required|string|min:15',
  isAvailable: 'required',
};

const booksController = {
  /**
   * @description Creates a new book
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  create(req, res) {
    const validation = new Validator(req.body, addBookRules);
    const bookDetails = {
      bookName: req.body.bookName,
      author: req.body.author,
      bookCount: req.body.bookCount,
      bookContent: req.body.bookContent,
      categoryId: req.body.categoryId,
      publishYear: req.body.publishYear,
      isbn: req.body.isbn,
      pages: req.body.pages,
      description: req.body.description
    };
    if (req.body.bookImage) {
      bookDetails.bookImage = req.body.bookImage;
    }
    if (validation.passes()) {
      return Book.create(bookDetails)
        .then(book => res.status(201).send({
          message: 'Book created',
          book
        }))
        .catch(err => res.status(500).send({
          message: 'Oops... Book not created. Try again.',
          err
        }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  /**
   * @description Find all books
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  list(req, res) {
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];

    let whereClause = {
      where: { isAvailable: true },
      include: [{
        model: Category,
        attributes: ['categoryName']
      }],
      limit,
      offset,
      order,
    };
    if (req.query.category) {
      whereClause = {
        where: { isAvailable: true, categoryId: req.query.category },
        include: [{
          model: Category,
          attributes: ['categoryName']
        }],
        limit,
        offset,
        order,
      };
    }
    return Book
      .findAndCountAll(whereClause)
      .then((books) => {
        return res.status(200).send({
          message: 'All books displayed',
          paginationMeta: generatePaginationMeta(books, limit, offset),
          books: books.rows });
      })
      .catch(() => res.status(500).send({
        message: 'Oops, failed to display books'
      }));
  },
  /**
   * @description Find one book
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  listOne(req, res) {
    return Book
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book displayed', book });
      })
      .catch(() => res.status(500).send({ message: 'Book display failed' }));
  },
  /**
   * @description update book
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  update(req, res) {
    const validation = new Validator(req.body, updateBookRules);
    const bookUpdateDetails = {
      bookName: req.body.bookName,
      author: req.body.author,
      bookCount: req.body.bookCount,
      categoryId: req.body.categoryId,
      publishYear: req.body.publishYear,
      isbn: req.body.isbn,
      pages: req.body.pages,
      description: req.body.description,
      isAvailable: req.body.isAvailable,
      countBorrow: req.body.countBorrow
    };
    if (req.body.bookImage) {
      bookUpdateDetails.bookImage = req.body.bookImage;
    }
    if (req.body.bookContent) {
      bookUpdateDetails.bookContent = req.body.bookContent;
    }
    if (validation.passes()) {
      return Book
        .findById(req.params.bookId)
        .then((book) => {
          if (!book) {
            return res.status(404).send({
              message: 'Book Not Found',
            });
          }
          return book
            .update(bookUpdateDetails)
            .then(update => res.status(200).send({
              message: 'Books updated', update
            }))
            .catch(err => res.status(400).send({
              message: 'Error updating books', err
            }));
        })
        .catch(() => res.status(500).send({
          message: 'Oops... Book not updated. Try again.'
        }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  /**
   * @description delete book
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  destroy(req, res) {
    const update = { isAvailable: false };
    return Book
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .update(update, { where: { id: book.id } })
          .then(() => res.status(200).send({ message: 'Book deleted' }))
          .catch(() => res.status(400).send({
            message: 'Error, No deletion occurred'
          }));
      })
      .catch(() => res.status(500).send({
        message: 'Oops... deletion failed'
      }));
  }
};
export default booksController;

