const Borrow = require('../models').borrow;
const Book = require('../models').book;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Borrow.create({
      user_id: req.decoded.id,
      book_id: req.body.book_id,
      borrow_date: new Date().getDay(),
      // collection_date:
      // expected_return:
      // actual_return:
    })
      .then(category => res.status(201).send({ message: 'Borrow completed', category }))
      .catch(error => res.status(400).send({ errors: error }));
  },
  // list(req, res) {
  //   return Category
  //     .findAll()
  //     .then(category => res.status(200).send({ message: 'All categories displayed', category }))
  //     .catch(error => res.status(400).send({ errors: error }));
  // },
  // update(req, res) {
  //   return Category
  //     .findById(req.params.categoryId)
  //     .then((category) => {
  //       if (!category) {
  //         return res.status(404).send({
  //           message: 'Category Not Found',
  //         });
  //       }
  //       return category
  //         .update({
  //           category_name: req.body.category_name,
  //         })
  //         .then(() => res.status(200).send({ message: 'Category updated', category }))
  //         .catch(error => res.status(400).send({ errors: error }));
  //     })
  //     .catch(error => res.status(400).send({ errors: error }));
  // },
  // // destroy(req, res) {
  // //   return Category
  // //     .findById(req.params.categoryId)
  // //     .then((category) => {
  // //       if (!category) {
  // //         return res.status(400).send({
  // //           message: 'Category Not Found',
  // //         });
  // //       }
  // //       return category
  // //         .destroy()
  // //         .then(() => res.status(204).send())
  // //         .catch(error => res.status(400).send(error));
  // //     })
  // //     .catch(error => res.status(400).send(error));
  // // },
};
