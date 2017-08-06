const Category = require('../models').category;

module.exports = {
  create(req, res) {
    return Category.create({
      category_name: req.body.category_name,
    })
      .then(category => res.status(201).send({ message: 'Category created', category }))
      .catch(error => res.status(400).send({ message: 'Category exist, add another', errors: error.errors }));
  },
  list(req, res) {
    return Category
      .all()
      .then(category => res.status(200).send({ message: 'All categories displayed', category }))
      .catch(error => res.status(400).send({ message: 'No categories displayed', errors: error.errors }));
  },
};
