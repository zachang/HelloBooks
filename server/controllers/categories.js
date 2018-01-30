import Validator from 'validatorjs';
import db from '../models';

const Category = db.Category;

const addCatRules = {
  categoryName: 'required|string|min:2',
};

const updateCatRules = {
  categoryName: 'required|string|min:2',
};

const categoryController = {
  /**
   * @description create categories
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  create(req, res) {
    const validation = new Validator(req.body, addCatRules);
    return Category.findOne({
      where: { categoryName: req.body.categoryName }
    })
      .then((categoryName) => {
        if (categoryName) {
          return res.status(409).send({
            message: 'Category already exist'
          });
        }
        if (validation.passes()) {
          return Category.create({
            categoryName: req.body.categoryName,
          })
            .then(category => res.status(201).send({
              message: 'Category created',
              category
            }))
            .catch(() => {
              res.status(500).send({ message: 'Error, Category not created' });
            });
        }
        return res.status(400).json({
          message: 'Validation error',
          errors: validation.errors.all()
        });
      })
      .catch(() => {
        res.status(500).send({ message: 'Request not processed' });
      });
  },
  /**
   * @description find all categories
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  list(req, res) {
    return Category
      .findAll()
      .then(category => res.status(200).send({
        message: 'All categories displayed',
        category
      }))
      .catch(() => res.status(500).send({
        message: 'Error, no category to display'
      }));
  },
  /**
   * @description update categories
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  update(req, res) {
    const validation = new Validator(req.body, updateCatRules);
    if (validation.passes()) {
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
              categoryName: req.body.categoryName,
            })
            .then(update => res.status(200).send({
              message: 'Category updated',
              update
            }))
            .catch(() => res.status(400).send({
              message: 'Error, No update done'
            }));
        })
        .catch(() => res.status(500).send({
          message: 'Oops... update failed'
        }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  /**
   * @description delete categories
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} response
   */
  destroy(req, res) {
    return Category
      .findById(req.params.categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return category
          .destroy()
          .then(() => res.status(200).send({
            message: 'Category deleted'
          }))
          .catch(() => res.status(400).send({
            message: 'Error, No deletion occurred'
          }));
      })
      .catch(() => res.status(500).send({
        message: 'Oops... deletion failed'
      }));
  },
};
export default categoryController;
