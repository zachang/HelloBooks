const Book = require('../models').book;

module.exports = {
  create(req, res) {
    return Book.create({
      book_name: req.body.book_name,
      book_image: req.body.book_image,
      book_count: req.body.book_count,
      count_borrow: req.body.count_borrow,
      is_available: req.body.is_available
    })
      .then(book => res.status(201).send({ message: 'Book created', book }))
      .catch(error => res.status(400).send({ message: 'Book not created, enter enter details properly', errors: error.errors }));
  },
  list(req, res) {
    return Book
      .all()
      .then(books => res.status(200).send({ message: 'All books shown', books }))
      .catch(error => res.status(400).send({ message: 'No book shown', errors: error.errors }));
  },
};
