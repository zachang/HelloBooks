import Validator from 'validatorjs';

import db from '../models';

const Book = db.Book;

const addBookRules = {
  book_name: 'required|min:1',
  author: 'required|min:2',
  category_id: 'required',
  book_count: 'required|min:1',
  book_image: 'required',
};

const updateBookRules = {
  book_name: 'required|min:1',
  author: 'required|min:2',
  category_id: 'required',
  book_count: 'required|min:1',
  book_image: 'required',
  is_available: 'required',
};

const booksController = {
  create(req, res) {
    const validation = new Validator(req.body, addBookRules);
    if (validation.passes()) {
      return Book.create({
        book_name: req.body.book_name,
        author: req.body.author,
        category_id: req.body.category_id,
        book_count: req.body.book_count,
        book_image: req.body.book_image,
      })
        .then(book => res.status(201).send({ message: 'Book created', book }))
        .catch(error => res.status(400).send({ message: 'Book not created' }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  list(req, res) {
    return Book
      .findAll()
      .then(books => res.status(200).send({ message: 'All books displayed', books }))
      .catch(error => res.status(400).send({ message: 'Error,Nothing to display' }));
  },
  update(req, res) {
    const validation = new Validator(req.body, updateBookRules);
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
            .update({
              book_name: req.body.book_name,
              book_image: req.body.book_image,
              author: req.body.author,
              book_count: req.body.book_count,
              is_available: req.body.is_available
            })
            .then(() => res.status(200).send({ message: 'Books updated', book }))
            .catch(error => res.status(400).send({ message: 'Error updating books' }));
        })
        .catch(error => res.status(400).send({ message: 'Error updating books' }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  }
};
export default booksController;

