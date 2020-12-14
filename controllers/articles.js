const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const getArticles = async (req, res, next) => {
  try {
    const queryCard = await Article.find({}).populate('user')
      .orFail(new NotFoundError('Пользователя не существует'));
    res.status(200).send(queryCard);
  } catch (err) {
    next(err);
  }
  return null;
};

const createArticle = async (req, res, next) => {
  try {
    const owner = req.user;
    const savedArticle = await Article.create({...req.body, owner});

    const data = savedArticle.toJSON();
    delete data.owner;

    res.status(200).send(data);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      const errors = Object.values(err.errors).map(error => error.message).join(', ');
      next(new ConflictError(errors));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestErr('Невалидные данные'));
    } else {
      next(err);
    }
  }
  return null;
};

const deleteArticle = async (req, res, next) => {
  try {
    const user = String(req.user);

    const { articleId } = req.params;
    const queryArticle = await Article.findById(articleId)
      .orFail(new NotFoundError('Карточка не найдена'));
    const queryCardOwner = String(queryArticle.owner);

    if (user !== queryCardOwner) {
      throw new ForbiddenError('Запрещено удалять карточки других пользователей');
    }

    const deletedArticle = await Article.findByIdAndDelete(articleId);
    return res.send(deletedArticle);
  } catch (err) {
    next(err);
  }

  return null;
};


module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
