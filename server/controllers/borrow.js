import db from '../models';
import { handleError, generatePaginationMeta } from '../utils/helpers';

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
          borrow_status: 'pending'
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
        const update = { returned: 'pending' };
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
            model: Category,
            attributes: ['category_name']
          }],
          attributes: ['id', 'book_name', 'author',
            'book_count', 'book_image',
            'publish_year', 'pages', 'description']
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
  },
  borrowsViewByAdmin(req, res) {
    const limit = req.query.limit || 15;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];

    const whereClause = {
      where: { borrow_status: { $or: ['pending', 'true'] } },
      include: [
        {
          model: Book,
          include: [{
            model: Category,
            attributes: ['category_name']
          }],
          attributes: ['id', 'book_name', 'author',
            'book_count', 'book_image',
            'publish_year', 'pages', 'description']
        },
        {
          model: User,
          attributes: ['fullname', 'level', 'email']
        }],
      limit,
      offset,
      order
    };
    Borrow.findAndCountAll(whereClause)
      .then((borrower) => {
        return res.status(200).send({
          paginationMeta: generatePaginationMeta(borrower, limit, offset),
          borrowers: borrower.rows,
        });
      })
      .catch(() => res.status(503).send({ message: 'Service not available' }));
  },
  returnsViewByAdmin(req, res) {
    const limit = req.query.limit || 15;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];

    const whereClause = {
      where: { returned: { $or: ['true', 'pending'] } },
      include: [
        {
          model: Book,
          include: [{
            model: Category,
            attributes: ['category_name']
          }],
          attributes: ['id', 'book_name', 'author',
            'book_count', 'book_image',
            'publish_year', 'pages', 'description']
        },
        {
          model: User,
          attributes: ['fullname', 'level', 'email']
        }],
      limit,
      offset,
      order
    };
    Borrow.findAndCountAll(whereClause)
      .then((returner) => {
        return res.status(200).send({
          paginationMeta: generatePaginationMeta(returner, limit, offset),
          returners: returner.rows,
        });
      })
      .catch(() => res.status(503).send({ message: 'Service not available' }));
  },
  acceptReturns(req, res) {
    const parameter = req.params;
    return Borrow.findOne({ where: { id: parameter.borrowId, returned: 'pending' } })
      .then((borrowed) => {
        if (!borrowed) {
          return res.status(404).send({ message: 'Borrow not found' });
        }
        return borrowed.update({ returned: 'true', actual_return: new Date() })
          .then(() => res.status(200).send({ message: 'Return confirmed' }));
      })
      .catch(() => res.status(503).send({ message: 'Service not available' }));
  },
  acceptBorrows(req, res) {
    const params = req.params;
    return Borrow.findOne({ where: { id: params.borrowId, collection_date: null } })
      .then((borrowed) => {
        if (!borrowed) {
          return res.status(404).send({ message: 'Borrow not found' });
        }
        return borrowed.update({ borrow_status: 'true', collection_date: new Date(), expected_return: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)) })
          .then(() => res.status(200).send({ message: 'Borrow confirmed' }));
      })
      .catch(() => res.status(503).send({ message: 'Service not available' }));
  }
};

export default borrowController;
