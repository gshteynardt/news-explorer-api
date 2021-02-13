const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');
const { jwtKey } = require('../utils/config.js');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedErr('Необходима авторизация');
    }
    const token = await authorization.replace('Bearer ', '');

    let payload;

    try {
      payload = await jwt.verify(token, jwtKey);
    } catch (err) {
      next(new UnauthorizedErr('Необходима авторизация'));
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }

  return null;
};
