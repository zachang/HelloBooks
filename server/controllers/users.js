const jwt = require('jsonwebtoken');
const User = require('../models').User;

const secret = process.env.SECRET_TOKEN;

const userDetails = (user) => {
  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    phone_no: user.phone_no,
    image_url: user.image_url,
    is_admin: user.is_admin,
    block_status: user.block_status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports = {
  create(req, res) {
    return User.create(req.body)
      .then((newUser) => {
        const token = jwt.sign(userDetails(newUser),
          secret, { expiresIn: '10h' });
        res.status(201).send({ message: 'User successfully created', token });
      })
      .catch(error => res.status(400).send({ message: 'User not created', errors: error.errors }));
  },
  login(req, res) {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (user && user.validPassword(req.body.password)) {
          const token = jwt.sign(userDetails(user),
            secret, { expiresIn: '10h' });
          return res.status(200).send({ message: 'User Logged in', token });
        }
        return res.status(400).json({ message: 'Invalid credentials' });
      })
      .catch((error) => {
        res.send({ errors: error.message });
      });
  }
};
