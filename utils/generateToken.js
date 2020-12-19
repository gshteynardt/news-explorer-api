const jwt = require('jsonwebtoken');
const { jwtKey, nodeEnv, devJWT } = require('./config.js');

const jwtSecret = nodeEnv === 'production' ? jwtKey : devJWT;

module.exports.generateToken = (id) => jwt.sign({ _id: id },
  jwtSecret,
  { expiresIn: '7d' });
