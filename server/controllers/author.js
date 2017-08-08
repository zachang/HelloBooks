const Author = require('../models').author;

module.exports = {
  create(req, res) {
    return Author.create({
      authorName: req.body.authorName,
    })
      .then(author => res.status(201).send({ message: 'Author created', author }))
      .catch(error => res.status(400).send({ errors: error.errors }));
  },
  list(req, res) {
    return Author
      .all()
      .then(author => res.status(200).send({ message: 'Authors displayed', author }))
      .catch(error => res.status(400).send({ errors: error.errors }));
  },
  update(req, res) {
    return Author
      .findById(req.params.authorId)
      .then((author) => {
        if (!author) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return author
          .update({
            authorName: req.body.authorName,
          })
          .then(() => res.status(200).send({ message: 'Books updated', author }))
          .catch(error => res.status(400).send({ message: 'Books not updated', errors: error.errors }));
      })
      .catch(error => res.status(400).send({ errors: error.errors }));
  }
};
