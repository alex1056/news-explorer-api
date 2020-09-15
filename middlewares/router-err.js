const routerErr = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

routerErr.use((req, res, next) => {
  // res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  // next();
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

module.exports = routerErr;
