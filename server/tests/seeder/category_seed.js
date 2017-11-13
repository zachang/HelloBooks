import db from '../../models';

const Category = db.Category;

const categoryseeder = {
  emptyCategoryTable(done) {
    Category.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setCatData(category_name) {
    return {
      category_name,
    };
  },
  setUpdateCatData(category_name) {
    return {
      category_name,
    };
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
    ];
    Category.bulkCreate(categories, { returning: true })
      .then(() => done())
      .catch(err => done(err));
  },
};

export default categoryseeder;
