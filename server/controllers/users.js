import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import db from '../models';

const User = db.User;

const secret = process.env.SECRET_TOKEN;

const userDetails = (user) => {
  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    phone_no: user.phone_no,
    is_admin: user.is_admin,
    block_status: user.block_status,
    level: user.level,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const signUpRules = {
  fullname: 'required|string|min:5',
  username: 'required|string|min:6',
  email: 'required|email',
  password: 'required|min:6|confirmed',
  password_confirmation: 'required',
  phone_no: 'required|string|min:11|max:11',
};

const usersController = {
  create(req, res) {
    const validation = new Validator(req.body, signUpRules);
    if (validation.passes()) {
      return User.create(req.body)
        .then((newUser) => {
          const token = jwt.sign(userDetails(newUser), secret, { expiresIn: '10h' });
          res.status(201).send({ message: 'User successfully created', token });
        })
        .catch(() => {
          res.status(400).send({ message: 'User not created' });
        });
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  login(req, res) {
    return User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (user && user.validPassword(req.body.password)) {
          const token = jwt.sign(userDetails(user),
            secret, { expiresIn: '10h' });
          return res.status(200).send({ message: 'User Logged in', token });
        }
        return res.status(404).json({ message: 'Invalid credentials' });
      })
      .catch(() => {
        res.status(400).send({ message: 'Invalid credentials' });
      });
  }
};
export default usersController;
