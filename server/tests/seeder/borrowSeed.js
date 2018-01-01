import db from '../../models';

const Borrow = db.Borrow;

const borrowSeeder = {
  emptyBorrowTable(done) {
    Borrow.destroy({truncate: true})
      .then(() => done())
      .catch(err => done(err));
  },
};

export default borrowSeeder;