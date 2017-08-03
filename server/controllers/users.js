const User = require('../models').User;

const userDetails = (user) => {
  return {
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    phone_no: user.phone_no,
    is_admin: user.is_admin,
    block_status: user.block_status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
};

module.exports = {
  create(req, res) {
    return User.create(req.body)
      .then(newUser => res.status(201).send({ user: userDetails(newUser)}))
      .catch(error => res.status(400).send({errors: error.errors}));
  },
};