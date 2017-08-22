import db from '../../models';

const Book = db.Book;
const Category = db.Category;

const bookseeder = {
  emptyBookTable(done) {
    Book.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  emptyCategoryTable(done) {
    Category.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setBookData(book_name, author, category_id, book_count, book_image) {
    return {
      book_name,
      author,
      category_id,
      book_count,
      book_image
    };
  },
  setUpdateBookData(book_name, author, category_id, book_count, book_image, is_available) {
    return {
      book_name,
      author,
      category_id,
      book_count,
      book_image,
      is_available
    };
  },
  addBookToDb(done) {
    Book.create({
      book_name: 'Brave Heart',
      author: 'Townsend Jnr',
      category_id: 1,
      book_count: 2,
      book_image: 'brave.jpg'
    })
      .then(book => done())
      .catch(err => done(err));
  },
  addCategoryToDb(done) {
    const categories = [
      {
        id: 1,
        category_name: 'Politics'
      },
      {
        id: 2,
        category_name: 'Health'
      }
    ]
    Category.bulkCreate(categories, { returning: true })
      .then(() => done())
      .catch(err => done(err));
  },
};

export default bookseeder;
