const { celebrate, Joi } = require('celebrate');
const urlValidation = require('../utils/urlValidation');

const idUserValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex()
      .message({
        'string.empty': 'Поле "articleId" не должно быть пустым',
        'string.length': 'Длина поля "articleId" должна быть 24 символа',
        'string.hex': 'Поле "articleId" должно быть в hex формате',
      }),
  }),
});

const idArticleValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex()
      .message({
        'string.empty': 'Поле "articleId" не должно быть пустым',
        'string.length': 'Длина поля "articleId" должна быть 24 символа',
        'string.hex': 'Поле "articleId" должно быть в hex формате',
      }),
  }),
});

const validationDataUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.empty': 'Поле "email" не должно быть пустым',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
    password: Joi.string().required().trim().min(1)
      .message({
        'any.required': 'Поле "password" должно быть заполнено',
        'string.empty': 'Поле "password" не должно быть пустым',
        'string.min': 'Минимальная длина поля "password" - 5 символов',
      }),
    name: Joi.string().min(2).max(30)
      .message({
        'any.required': 'Поле "name" должно быть заполнено',
        'string.empty': 'Поле "name" не должно быть пустым',
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
      }),
  }),
});

const validationDataArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30)
      .message({
        'any.required': 'Поле "keyword" должно быть заполнено',
        'string.empty': 'Поле "keyword" не должно быть пустым',
        'string.min': 'Минимальная длина поля "keyword" - 2 символа',
        'string.max': 'Максимальная длина поля "keyword" - 30 символов',
      }),
    title: Joi.string().required().trim().min(1)
      .messages({
        'any.required': 'Поле "title" должно быть заполнено',
        'string.empty': 'Поле "title" не должно быть пустым',
      }),
    text: Joi.string().required().trim().min(1)
      .messages({
        'any.required': 'Поле "text" должно быть заполнено',
        'string.empty': 'Поле "text" не должно быть пустым',
      }),
    date: Joi.string().required().trim().min(1)
      .messages({
        'any.required': 'Поле "date" должно быть заполнено',
        'string.empty': 'Поле "date" не должно быть пустым',
      }),
    source: Joi.string().required().trim().min(1)
      .messages({
        'any.required': 'Поле "source" должно быть заполнено',
        'string.empty': 'Поле "source" не должно быть пустым',
      }),
    image: Joi.string().required().custom(urlValidation)
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
        'string.empty': 'Поле "image" не должно быть пустым',
      }),
    link: Joi.string().required().custom(urlValidation)
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
        'string.empty': 'Поле "link" не должно быть пустым',
      }),
  }),
});

module.exports = {
  idUserValidation,
  idArticleValidation,
  validationDataArticle,
  validationDataUser,
};
