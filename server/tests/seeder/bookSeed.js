import db from '../../models';

const Book = db.Book;

const bookseeder = {
  emptyBookTable(done) {
    Book.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setBookData(bookName, author, categoryId,
    publishYear, isbn, pages, bookCount,
    bookContent, bookImage, description) {
    return {
      bookName,
      author,
      categoryId,
      publishYear,
      isbn,
      pages,
      bookCount,
      bookContent,
      bookImage,
      description
    };
  },
  setUpdateBookData(bookName, author, categoryId,
    publishYear, isbn, pages, bookCount,
    bookContent, bookImage, description, isAvailable) {
    return {
      bookName,
      author,
      categoryId,
      publishYear,
      isbn,
      pages,
      bookCount,
      bookContent,
      bookImage,
      description,
      isAvailable
    };
  },
  addBookToDb(done) {
    Book.create({
      bookName: 'Brave Heart',
      author: 'Townsend Jnr',
      categoryId: 1,
      publishYear: new Date('1991/08/06'),
      isbn: 'ISBN43333334',
      pages: 506,
      bookCount: 2,
      bookContent: 'read.pdf',
      bookImage: 'brave.jpg',
      description: 'Inspiring story of a young scottish barbarian',
      countBorrow: 2
    })
      .then(() => done())
      .catch(err => done(err));
  },
  addBookToDb1(done) {
    Book.create({
      bookName: 'Braveless Heart',
      author: 'Towns Jnr',
      categoryId: 1,
      publishYear: new Date('1994/08/06'),
      isbn: 'ISBN48333334',
      pages: 806,
      bookCount: 4,
      bookContent: 'reading.pdf',
      bookImage: 'brand.jpg',
      description: 'Inspiring story of a young scottish barbarian',
    })
      .then(() => done())
      .catch(err => done(err));
  },
  addBookToDb2(done) {
    Book.create({
      bookName: 'Batter',
      author: 'Tony Jnr',
      categoryId: 1,
      publishYear: new Date('1971/03/06'),
      isbn: 'ISBN48334334',
      pages: 906,
      bookCount: 2,
      bookContent: 'batter.pdf',
      bookImage: 'batter.jpg',
      description: 'Inspiring story of batter system way back',
    })
      .then(() => done())
      .catch(err => done(err));
  }
};

export default bookseeder;
