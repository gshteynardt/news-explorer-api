const { CelebrateError } = require("celebrate");

const checkValueEmpty = (value) => {
  if(!value.trim()) {
    throw new CelebrateError('поле должно быть заполнено');
  }
  return true
};

module.exports = checkValueEmpty;
