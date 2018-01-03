import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import bcrypt from 'bcrypt-nodejs';
import { generatePaginationMeta } from '../utils/helpers';
import db from '../models';

const User = db.User;

const secret = process.env.SECRET_TOKEN;

const userDetails = (user) => {
  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    phoneNo: user.phoneNo,
    userImage: user.userImage,
    isAdmin: user.isAdmin,
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
  phoneNo: 'required|string|min:11|max:11',
};

const loginRules = {
  username: 'required',
  password: 'required',
};

const updateRules = {
  fullname: 'required|string|min:2',
  username: 'required|string|min:6',
  email: 'required|email',
  phoneNo: 'required|string|min:11|max:11',
};

const changePasswordRules = {
  oldPassword: 'required',
  newPassword: 'required|min:6|confirmed',
  newPassword_confirmation: 'required',
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
    const validation = new Validator(req.body, loginRules);
    if (validation.passes()) {
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
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  list(req, res) {
    const limit = req.query.limit || 2;
    const offset = req.query.offset || 0;
    const order = (req.query.order && req.query.order.toLowerCase() === 'desc')
      ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']];
    return User
      .findAndCountAll({ limit, offset, order })
      .then((users) => {
        return res.status(200).send({
          paginationMeta: generatePaginationMeta(users, limit, offset),
          users: users.rows });
      })
      .catch(() => res.status(400).send({ message: 'Error, nothing to display' }));
  },
  listOne(req, res) {
    const { userId } = req.params;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User does not exist' });
        }
        return res.status(200).send({
          message: 'User displayed',
          user
        });
      })
      .catch(() => res.status(500).send({ message: 'Oops, failed to display books' }));
  },
  update(req, res) {
    const validation = new Validator(req.body, updateRules);
    const userInfo = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      phoneNo: req.body.phoneNo
    };

    if (req.body.userImage) {
      userInfo.userImage = req.body.userImage;
    }

    if (validation.passes()) {
      return User
        .findById(req.params.userId)
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          return user
            .update(userInfo)
            .then(update => res.status(200).send({ message: 'User updated', update }))
            .catch(() => res.status(400).send({ message: 'Error, No update done' }));
        })
        .catch(() => res.status(500).send({ message: 'Oops, failed to update user' }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const validation = new Validator(req.body, changePasswordRules);
    if (validation.passes()) {
      const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
      return User.findById(req.decoded.id)
        .then((user) => {
          if (!bcrypt.compareSync(oldPassword, user.password)) {
            return res.status(400).send({
              message: 'Incorrect old password'
            });
          }

          return user.update({
            password: hashPassword
          }).then(updated => res.status(200).send({
            message: 'Password changed',
            updated
          }))
            .catch(() => res.status(400).send({
              message: 'Password not changed'
            }));
        })
        .catch(() => {
          res.status(500).send({ message: 'Something went wrong' });
        });
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  }
};
export default usersController;
