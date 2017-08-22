import * as _ from 'underscore';
import db from '../models';

const Category = db.Category;

const categoryController = {
  create(req, res) {
    return Category.create({
      category_name: req.body.category_name,
    })
      .then(category => res.status(201).send({ message: 'Category created', category }))
      .catch(error => res.status(400).send({ message: 'Error, Category not created' }));
  },
  list(req, res) {
    return Category
      .findAll()
      .then(category => res.status(200).send({ message: 'All categories displayed', category }))
      .catch(error => res.status(400).send({ message: 'Error, no category to displayed ' }));
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
          .catch(error => res.status(400).send({ message: 'Error, No update done' }));
      })
      .catch(error => res.status(400).send({ message: 'Error, No update done' }));
  },
  destroy(req, res) {
    return Category
      .findById(req.params.categoryId)
      .then((category) => {
        if (!category) {
          return res.status(400).send({
            message: 'Category Not Found',
          });
        }
        return category
          .destroy()
          .then(() => res.status(204).send({ message: 'Category deleted' }))
          .catch(error => res.status(400).send({ message: 'No deletion occurred' }));
      })
      .catch(error => res.status(400).send({ message: 'Deletion failed' }));
  },
};
export default categoryController;
