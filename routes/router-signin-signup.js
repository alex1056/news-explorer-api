const { celebrate, Joi } = require('celebrate');
const routerSignInUp = require('express').Router();
const {
  createUser, login, logout,
} = require('../controllers/users');

routerSignInUp.get('/logout', logout);

routerSignInUp.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
      password: Joi.string().required().min(2).max(30),
    }),
  }),
  login);

routerSignInUp.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
      password: Joi.string().required().min(2).max(30),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser);

module.exports = routerSignInUp;
