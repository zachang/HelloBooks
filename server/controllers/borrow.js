import db from '../models';
import { handleError } from '../utils/helpers';

const Borrow = db.Borrow;
const Book = db.Book;
const User = db.User;
const Category = db.Category;

const borrowController = {
  create(req, res) {
    const obj = req.body;
    const params = req.params;
    Borrow.findAll({ where: { user_id: params.userId, returned: { $or: ['pending', 'false'] } } })
      .then((found) => {
        if (found.length) return Promise.reject({ code: 400, message: 'You have not returned the previous book you borrowed' });
        return Book.findById(obj.book_id);
      })
      .then((book) => {
        if (!book) {
          return Promise.reject({ code: 404, message: 'Book not found' });
        }
        if (!book.is_available) {
          return Promise.reject({ code: 404, message: 'Book not available' });
        }
        if (book.count_borrow >= book.book_count) {
          return Promise.reject({ code: 404, message: 'All books have been borrowed' });
        }

        return Borrow.create({
          user_id: params.userId,
          book_id: req.body.book_id,
          borrow_date: new Date(),
          expected_return: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)),
          collection_date: new Date()
        });
      })
      .then((borrow) => {
        return Book.findById(borrow.book_id);
      })
      .then((book) => {
        const count = book.count_borrow;
        const update = { count_borrow: count + 1 };
        return book.update(update);
      })
      .then(updated => res.status(200).send({ message: 'Borrow completed', updated }))
      .catch(err => handleError(err, res));
  },
  returnBook(req, res) {
    const bookId = req.body.book_id;
    const userId = req.params.userId;
    return Book.findById(bookId)
      .then((found) => {
        if (!found) return Promise.reject({ code: 400, message: 'Book not found' });
        return Borrow.findOne({ where: { user_id: userId, book_id: bookId, returned: 'false' } });
      })
      .then((borrowed) => {
        if (!borrowed) {
          return Promise.reject({ code: 400, message: 'Book already returned' });
        }
        const update = { returned: 'pending', actual_return: new Date() };
        return Borrow.update(update, { where: { user_id: userId, book_id: bookId, returned: 'false' } });
      })
      .then((updatedCount) => {
        if (updatedCount[0] > 0) {
          return Book.findById(bookId);
        }
        return Promise.reject({ code: 400, message: 'Error returning book' });
      })
      .then((book) => {
        if (book.count_borrow > 0) {
          const counts = book.count_borrow - 1;
          return book.update({ count_borrow: counts });
        }
        return Promise.reject({ code: 400, message: 'Error returning book' });
      })
      .then((updateBook) => {
        res.status(200).send({ message: 'return completed', updateBook });
      })
      .catch(err => handleError(err, res));
  },
  borrowsByUser(req, res) {
    const userId = req.params.userId;
    const whereClause = {
      include: [
        {
          model: Book,
          include: [{
            model: Category
          }],
          attributes: ['id', 'book_name', 'author',
            'book_count', 'book_image',
            'publish_year','pages', 'description']
        },
        {
          model: User,
          attributes: ['fullname', 'level', 'email']
        }]
    };
    if (req.query.owe === 'false') {
      whereClause.where = { user_id: userId, returned: { $or: ['pending', 'false'] } };
    } else if (req.query.owe === 'true') {
      whereClause.where = { user_id: userId, returned: 'true' };
    }
    Borrow.findAll(whereClause)
      .then((borrows) => {
        return res.status(200).send({ borrowed: borrows });
      })
      .catch(() => res.status(503).send({ message: 'Request not available' }));
  }
};

export default borrowController;
