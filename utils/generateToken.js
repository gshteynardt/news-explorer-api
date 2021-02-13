const jwt = require('jsonwebtoken');
const { jwtKey } = require('./config.js');

module.exports.generateToken = (id) => jwt.sign({ _id: id },
  jwtKey,
  { expiresIn: '7d' });
