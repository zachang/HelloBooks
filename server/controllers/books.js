import Validator from 'validatorjs';
import fs from 'fs';

import db from '../models';

const Book = db.Book;
const Category = db.Category;

const addBookRules = {
  book_name: 'required|string|min:2',
  author: 'required|string|min:2',
  category_id: 'required|min:1',
  book_count: 'required|min:1',
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
  isbn: 'required',
  pages: 'required',
  book_count: 'required|min:1',
  description: 'required|string|min:15',
  is_available: 'required',
};

const booksController = {
  create(req, res) {
    const validation = new Validator(req.body, addBookRules);
    const obj = {
      book_name: req.body.book_name,
      author: req.body.author,
      book_count: req.body.book_count,
      category_id: req.body.category_id,
      publish_year: req.body.publish_year,
      isbn: req.body.isbn,
      pages: req.body.pages,
      description: req.body.description
    };
    if (req.file) {
      obj.book_image = req.file.filename;
    }
    if (validation.passes()) {
      return Book.create(obj)
        .then(book => res.status(201).send({ message: 'Book created', book }))
        .catch(err => res.status(400).send({ message: 'Book not created', err }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  list(req, res) {
    return Book
      .findAll()
      .then((books) => {
        if (books.length === 0) {
          return res.status(200).send({ message: 'Nothing to display' });
        }
        return res.status(200).send({ message: 'All books displayed', books });
      })
      .catch(() => res.status(400).send({ message: 'Oops, failed to display' }));
  },
  listCatBook(req, res) {
    const params = req.params;
    Category
      .findById(params.categoryId)
      .then((found) => {
        if (!found) {
          return Promise.reject({ status: 404, message: 'Category not found' });
        }
        return Book.findAll({ where: { category_id: found.id } });
      })
      .then((books) => {
        if (books.length === 0) {
          return res.status(404).send({ message: 'No books for this category' });
        }
        return res.status(200).send({ message: 'All books displayed by category', books });
      })
      .catch((error) => {
        if (error.status && error.message) {
          return res.status(error.status).json({ message: error.message });
        }
        return res.status(400).send({ message: error });
      });
  },
  update(req, res) {
    const validation = new Validator(req.body, updateBookRules);
    const obj = {
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
    if (req.file) {
      obj.book_image = req.file.filename;
    }
    if (validation.passes()) {
      return Book
        .findById(req.params.bookId)
        .then((book) => {
          try {
            fs.unlinkSync(`./server/uploads/books/${book.book_image}`);
          } catch (err) {
            //
          }
          if (!book) {
            return res.status(404).send({
              message: 'Book Not Found',
            });
          }
          return book
            .update(obj)
            .then(() => res.status(200).send({ message: 'Books updated', book }))
            .catch(err => res.status(400).send({ message: 'Error updating books', err }));
        })
        .catch(() => res.status(400).send({ message: 'Error updating books' }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  }
};
export default booksController;

