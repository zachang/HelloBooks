const Category = require('../models').category;

module.exports = {
  create(req, res) {
    return Category.create({
      category_name: req.body.category_name,
    })
      .then(category => res.status(201).send({ message: 'Category created', category }))
      .catch(error => res.status(400).send({ errors: error }));
  },
  list(req, res) {
    return Category
      .findAll()
      .then(category => res.status(200).send({ message: 'All categories displayed', category }))
      .catch(error => res.status(400).send({ errors: error }));
  },
  update(req, res) {
    return Category
      .findById(req.params.categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return category
          .update({
            category_name: req.body.category_name,
          })
          .then(() => res.status(200).send({ message: 'Category updated', category }))
          .catch(error => res.status(400).send({ errors: error }));
      })
      .catch(error => res.status(400).send({ errors: error }));
  }
};
