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
      description: 'Inspiring story of a young scottish barbarian'
    })
      .then(() => done())
      .catch(err => done(err));
  },
};

export default bookseeder;
