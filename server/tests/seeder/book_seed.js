import db from '../../models';

const Book = db.Book;

const bookseeder = {
  emptyBookTable(done) {
    Book.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setBookData(book_name, author, category_id,
    publish_year, isbn, pages, book_count,
    book_content, book_image, description) {
    return {
      book_name,
      author,
      category_id,
      publish_year,
      isbn,
      pages,
      book_count,
      book_content,
      book_image,
      description
    };
  },
  setUpdateBookData(book_name, author, category_id,
    publish_year, isbn, pages, book_count,
    book_content, book_image, description, is_available) {
    return {
      book_name,
      author,
      category_id,
      publish_year,
      isbn,
      pages,
      book_count,
      book_content,
      book_image,
      description,
      is_available
    };
  },
  addBookToDb(done) {
    Book.create({
      book_name: 'Brave Heart',
      author: 'Townsend Jnr',
      category_id: 1,
      publish_year: new Date('1991/08/06'),
      isbn: 'ISBN43333334',
      pages: 506,
      book_count: 2,
      book_content: 'read.pdf',
      book_image: 'brave.jpg',
      description: 'Inspiring story of a young scottish barbarian'
    })
      .then(() => done())
      .catch(err => done(err));
  },
};

export default bookseeder;
