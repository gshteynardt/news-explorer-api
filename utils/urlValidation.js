const isURL = require('validator/lib/isURL');
const { CelebrateError } = require("celebrate");

const urlValidation = (value) => {
  if (!isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

module.exports = urlValidation;
