const bookCategory = require('../models').bookCategory;

module.exports = {
  list(req, res) {
    return bookCategory
      .all()
      .then(bookcat => res.status(200).send({ message: 'All bookCategory displayed', bookcat }))
      .catch(error => res.status(400).send({ message: 'No bookCategory displayed', errors: error.errors }));
  },

};
