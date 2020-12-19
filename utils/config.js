const dotenv = require('dotenv');

dotenv.config();

const devUrl = 'mongodb://localhost:27017/newsdb';
const devJWT = 'dev-secret';
const {
  API_URL, PORT, NODE_ENV, JWT_SECRET,
} = process.env;

const port = PORT || 3000;
const endpoint = NODE_ENV === 'production' ? API_URL : devUrl;
const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : devJWT;

module.exports = {
  endpoint,
  port,
  jwtKey,
};
