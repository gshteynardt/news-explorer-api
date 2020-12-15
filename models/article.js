const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const Schema = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, `поле 'keyword' должно быть заполнено`],
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: [true, `поле 'title' должно быть заполнено`],
  },
  text: {
    type: String,
    required: [true, `поле 'text' должно быть заполнено`],
  },
  date: {
    type: String,
    required: [true, `поле 'date' должно быть заполнено`],
  },
  source: {
    type: String,
    required: [true, `поле 'source' должно быть заполнено`],
  },
  link: {
    type: String,
    required: [true, `поле 'link' должно быть заполнено`],
    validate: {
      validator: (value) => isURL(value),
      message: `поле 'link' должно быть валидным URL адресом`,
    },
  },
  image: {
    type: String,
    required: [true, `поле 'link' должно быть заполнено`],
    validate: {
      validator: (value) => isURL(value),
      message: `поле 'image' должно быть валидным URL адресом`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
