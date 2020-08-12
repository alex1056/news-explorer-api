const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, source, link, image, date,
  } = req.body;

  Article.create({
    keyword, title, text, source, link, image, date, owner: req.user._id,
  })
    .then((newArticle) => res.send({ data: newArticle }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new ValidationError(e.message);
        next(err);
      } else {
        next(e);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(`Статья с ID=${req.params.id} не найдена`);
      }
      return Article.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
        .then((found) => {
          if (!found) {
            throw new ForbiddenError('Нет доступа к удалению чужой статьи');
          }
          return res.send(found);
        })
        .catch((e) => {
          next(e);
        });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error(`Передан некорректный ID статьи ${req.params.id}`);
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
};
