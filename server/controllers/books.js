import db from '../models';

const Book = db.Book;

const booksController = {
  create(req, res) {
    Book.create({
      book_name: req.body.book_name,
      book_image: req.body.book_image,
      book_count: req.body.book_count,
      count_borrow: req.body.count_borrow,
      is_available: req.body.is_available,
    })
      .then(book => res.status(201).send({ message: 'Book created', book }))
      .catch(error => res.status(400).send({ message: 'Error', errors: error }));
  },
  list(req, res) {
    // return res.status(200).send({ hello: req.decoded.username })
    return Book
      .all()
      .then(books => res.status(200).send({ message: 'All books displayed', books }))
      .catch(error => res.status(400).send({ message: 'No book displayed', errors: error.errors }));
  },
  update(req, res) {
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
            book_count: req.body.book_count,
            count_borrow: req.body.count_borrow,
            is_available: req.body.is_available
          })
          .then(() => res.status(200).send({ message: 'Books updated', book }))
          .catch(error => res.status(400).send({ message: 'Books not updated', errors: error.errors }));
      })
      .catch(error => res.status(400).send({ errors: error.errors }));
  }
};
export default booksController;

