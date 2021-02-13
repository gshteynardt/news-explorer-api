const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedErr = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'поле \'email\' должно быть заполнено'],
    unique: [true, 'email must be unique'],
    validate: {
      validator: (value) => isEmail(value),
      message: 'поле \'email\' должно быть валидным email адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'поле \'password\' должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: [2, 'минимальная длина поля \'name\' - 2'],
    maxlength: [30, 'максимальная длина поля \'name\' - 5'],
  },
});

userSchema.statics.findUsersByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedErr('Неправильные почта или пароль');
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedErr('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
