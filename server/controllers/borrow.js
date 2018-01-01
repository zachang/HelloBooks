import db from '../models';
import { handleError, generatePaginationMeta, determineUserReturnDate } from '../utils/helpers';

const Borrow = db.Borrow;
const Book = db.Book;
const User = db.User;
const Category = db.Category;

const borrowController = {
  create(req, res) {
    const obj = req.body;
    const params = req.params;
    Borrow.findAll({ where: { userId: params.userId, returned: 'pending' } })
      .then((found) => {
        if (found.length) return Promise.reject({ code: 400, message: 'You have not returned the previous book you borrowed' });
        return Book.findById(obj.bookId);
      })
      .then((book) => {
        if (!book) {
          return Promise.reject({ code: 404, message: 'Book not found' });
        }
        if (!book.isAvailable) {
          return Promise.reject({ code: 404, message: 'Book not available' });
        }
        if (book.countBorrow >= book.bookCount) {
          return Promise.reject({ code: 404, message: 'All books have been borrowed' });
        }

        return Borrow.create({
          userId: params.userId,
          bookId: req.body.bookId,
          borrowDate: new Date(),
          borrowStatus: 'pending'
        });
      })
      .then((borrow) => {
        return Book.findById(borrow.bookId);
      })
      .then((book) => {
        const count = book.countBorrow;
        const update = { countBorrow: count + 1 };
        return book.update(update);
      })
      .then(updated => res.status(200).send({ message: 'Borrow completed', updated }))
      .catch(err => handleError(err, res));
  },
  returnBook(req, res) {
    const bookId = req.body.bookId;
    const userId = req.params.userId;
    return Book.findById(bookId)
      .then((found) => {
        if (!found) return Promise.reject({ code: 404, message: 'Book not found' });
        return Borrow.findOne({ where: { userId: userId, bookId: bookId, returned: 'false' } });
      })
      .then((borrowed) => {
        if (!borrowed) {
          return Promise.reject({ code: 400, message: 'Book already returned' });
        }
        const update = { returned: 'pending' };
        return Borrow.update(update, { where: { userId: userId, bookId: bookId, returned: 'false' } });
      })
      .then((updatedCount) => {
        if (updatedCount[0] > 0) {
          return Book.findById(bookId);
        }
        return Promise.reject({ code: 400, message: 'Error returning book' });
      })
      .then((book) => {
        if (book.countBorrow > 0) {
          const counts = book.countBorrow - 1;
          return book.update({ countBorrow: counts });
        }
        return Promise.reject({ code: 400, message: 'Error returning book' });
      })
      .then((updateBook) => {
        res.status(200).send({ message: 'return completed', updateBook });
      })
      .catch(err => handleError(err, res));
  },
  borrowsByUser(req, res) {
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    const userId = req.params.userId;
    const whereClause = {
      include: [
        {
          model: Book,
          include: [{
            model: Category,
            attributes: ['categoryName']
          }],
          attributes: ['id', 'bookName', 'author',
            'bookCount', 'bookImage',
            'publishYear', 'pages', 'description']
        }],
      limit,
      offset,
      order
    };
    if (req.query.owe === 'false') {
      whereClause.where = { userId: userId, borrowStatus: { $or: ['pending', 'true'] } };
    } else if (req.query.owe === 'true') {
      whereClause.where = { userId: userId, returned: 'true' };
    }
    return Borrow.findAndCountAll(whereClause)
      .then((borrows) => {
        return res.status(200).send({
          borrowed: borrows.rows,
          paginationMeta: generatePaginationMeta(borrows, limit, offset)
        });
      })
      .catch(() => res.status(503).send({ message: 'Request not available' }));
  },
  borrowsViewByAdmin(req, res) {
    const limit = req.query.limit || 15;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];

    const whereClause = {
      where: { borrowStatus: { $or: ['pending', 'true'] } },
      include: [
        {
          model: Book,
          include: [{
            model: Category,
            attributes: ['categoryName']
          }],
          attributes: ['id', 'bookName', 'author',
            'bookCount', 'bookImage',
            'publishYear', 'pages', 'description']
        },
        {
          model: User,
          attributes: ['fullname', 'level', 'email', 'id']
        }],
      limit,
      offset,
      order
    };
    return Borrow.findAndCountAll(whereClause)
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
            attributes: ['categoryName']
          }],
          attributes: ['id', 'bookName', 'author',
            'bookCount', 'bookImage',
            'publishYear', 'pages', 'description']
        },
        {
          model: User,
          attributes: ['fullname', 'level', 'email']
        }],
      limit,
      offset,
      order
    };
    return Borrow.findAndCountAll(whereClause)
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
        return borrowed.update({ returned: 'true', actualReturn: new Date() })
          .then((acceptReturn) => res.status(200).send({ message: 'Return confirmed', acceptReturn }));
      })
      .catch(() => res.status(503).send({ message: 'Service not available' }));
  },
  acceptBorrows(req, res) {
    const params = req.params;
    return Borrow.findOne({
      where: { id: params.borrowId, collectionDate: null },
      include: [
        {
          model: User,
          attributes: ['level']
        }],
    })
      .then((borrowed) => {
        if (!borrowed) {
          return res.status(404).send({ message: 'Borrow not found' });
        }
        return borrowed.update({
          borrowStatus: 'true', collectionDate: new Date(),
          expectedReturn: determineUserReturnDate(borrowed.User.level)
        })
          .then((acceptBorrow) => res.status(200).send({ message: 'Borrow confirmed', acceptBorrow }));
      })
      .catch(() => res.status(503).send({ message: 'Service not available' }));
  }
};

export default borrowController;
