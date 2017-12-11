import Validator from 'validatorjs';
import { generatePaginationMeta } from '../utils/helpers';
import db from '../models';

const Book = db.Book;
const Category = db.Category;

const addBookRules = {
  book_name: 'required|string|min:2',
  author: 'required|string|min:2',
  category_id: 'required|min:1',
  book_count: 'required|min:1',
  book_content: 'required',
  publish_year: 'required',
  isbn: 'required',
  pages: 'required',
  description: 'required|string|min:15'
};

const updateBookRules = {
  book_name: 'required|string|min:2',
  author: 'required|string|min:2',
  category_id: 'required|min:1',
  publish_year: 'required',
  book_content: 'required',
  isbn: 'required',
  pages: 'required',
  book_count: 'required|min:1',
  description: 'required|string|min:15',
  is_available: 'required',
};

const booksController = {
  create(req, res) {
    const validation = new Validator(req.body, addBookRules);
    const bookDetails = {
      book_name: req.body.book_name,
      author: req.body.author,
      book_count: req.body.book_count,
      book_content: req.body.book_content,
      category_id: req.body.category_id,
      publish_year: req.body.publish_year,
      isbn: req.body.isbn,
      pages: req.body.pages,
      description: req.body.description
    };
    if (req.body.book_image) {
      bookDetails.book_image = req.body.book_image;
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
  list(req, res) {
    const limit = req.query.limit || 2;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];

    let whereClause = {
      where: { is_available: true },
      include: [{
        model: Category,
        attributes: ['category_name']
      }],
      limit,
      offset,
      order,
    };
    if (req.query.category) {
      whereClause = {
        where: { is_available: true, category_id: req.query.category },
        include: [{
          model: Category,
          attributes: ['category_name']
        }],
        limit,
        offset,
        order,
      };
    }
    return Book
      .findAndCountAll(whereClause)
      .then((books) => {
        if (books.length === 0) {
          return res.status(200).send({ message: 'Nothing to display', books: [] });
        }
        return res.status(200).send({
          message: 'All books displayed',
          paginationMeta: generatePaginationMeta(books, limit, offset),
          books: books.rows });
      })
      .catch(() => res.status(400).send({ message: 'Oops, failed to display books' }));
  },
  listOne(req, res) {
    return Book
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({message: 'Book not found'});
        }
        return res.status(200).send({ message: 'Book displayed', book });
      })
      .catch(() => res.status(400).send({ message: 'Book display failed' }));
  },
  update(req, res) {
    const validation = new Validator(req.body, updateBookRules);
    const bookUpdateDetails = {
      book_name: req.body.book_name,
      author: req.body.author,
      book_count: req.body.book_count,
      category_id: req.body.category_id,
      publish_year: req.body.publish_year,
      isbn: req.body.isbn,
      pages: req.body.pages,
      description: req.body.description,
      is_available: req.body.is_available
    };
    if (req.body.book_image) {
      bookUpdateDetails.book_image = req.body.book_image;
    }
    if (req.body.book_content) {
      bookUpdateDetails.book_content = req.body.book_content;
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
            .then(update => res.status(200).send({ message: 'Books updated', update }))
            .catch(err => res.status(400).send({ message: 'Error updating books', err }));
        })
        .catch(() => res.status(500).send({ message: 'Oops... Book not updated. Try again.' }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  destroy(req, res) {
    const update = { is_available: false };
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
          .catch(() => res.status(400).send({ message: 'Error, No deletion occurred' }));
      })
      .catch(error => res.status(400).send(error));
  }
};
export default booksController;

