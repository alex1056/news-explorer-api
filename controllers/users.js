const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const { JWT_SECRET_DEV } = require('../config');

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((found) => {
      if (!found) {
        throw new NotFoundError(`Пользователь с ID=${req.user._id} не найден`);
      }
      const { name, email } = found;
      return res.send({ name, email });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error(`Передан некорректный ID=${req.user._id}`);
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) throw new ValidationError('Ошибка валидации данных, поле "email" должно быть заполнено');
  } catch (err) {
    return next(err);
  }
  try {
    if (!password.trim()) throw new ValidationError('Ошибка валидации данных, поле "пароль" должно быть заполнено');
  } catch (err) {
    return next(err);
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .end();
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
    .end();
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    if (!password.trim()) throw new ValidationError('Поле "пароль" должно быть заполнено');
  } catch (err) {
    return next(err);
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((e) => {
      if (e.name === 'MongoError' && e.code === 11000) {
        const err = new Error(`Пользователь с email=${email} уже существует`);
        err.statusCode = 409;
        next(err);
      } else if (e.name === 'ValidationError') {
        const err = new ValidationError(e.message);
        next(err);
      } else {
        next(e);
      }
    });
};
