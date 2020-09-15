const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const joiCustomUrlValidator = require('../helpers/joi-custom-url-validator.js');

const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');

routerArticles.post('/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2),
      title: Joi.string().required().min(2),
      text: Joi.string().required().min(2),
      date: Joi.string().required().min(2),
      source: Joi.string().required().min(2),
      link: Joi.string().required().custom(joiCustomUrlValidator, 'custom validation'),
      image: Joi.string().required().custom(joiCustomUrlValidator, 'custom validation'),
    }),
  }),
  createArticle);
routerArticles.get('/articles', getArticles);
routerArticles.delete('/articles/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteArticle);

module.exports = routerArticles;
