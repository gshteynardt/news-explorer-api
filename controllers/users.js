const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedErr = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestErr = require('../errors/bad-request-err');
const { generateToken } = require('../utils/generateToken');
const saltRounds = 10;

const getUser = async (req, res, next) => {
  const _id = req.user;
  try {
    const queryUser = await User.findById(_id)
      .orFail(new UnauthorizedErr('Пользователь не найден'));
    res.status(200).send(queryUser);
  } catch (err) {
    next(err);
  }
  return null;
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const savedUser = await User.create({
      email,
      password: hash,
      name,
    });

    const data = savedUser.toJSON();
    delete data.password;

    return res.status(200).send({ data });
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('Невалидные данные'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestErr('Невалидные данные'));
    } else {
      next(err);
    }
  }
  return null;
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUsersByCredentials(email, password);
    const payload = user._id;
    const token = await generateToken(payload);
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  createUser,
  loginUser,
}
