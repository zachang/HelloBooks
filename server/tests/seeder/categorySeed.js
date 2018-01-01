import db from '../../models';

const Category = db.Category;

const categoryseeder = {
  emptyCategoryTable(done) {
    Category.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setCatData(categoryName) {
    return {
      categoryName,
    };
  },
  setUpdateCatData(categoryName) {
    return {
      categoryName,
    };
  },
  addCategoryToDb(done) {
    const categories = [
      {
        id: 1,
        categoryName: 'Politics'
      },
      {
        id: 2,
        categoryName: 'Health'
      }
    ];
    Category.bulkCreate(categories, { returning: true })
      .then(() => done())
      .catch(err => done(err));
  },
};

export default categoryseeder;
