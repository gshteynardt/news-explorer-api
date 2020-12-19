const dotenv = require('dotenv');
dotenv.config();

const devUrl = 'mongodb://localhost:27017/newsdb';
const devJWT = 'dev-secret';

module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtKey: process.env.JWT_SECRET,
  devUrl,
  devJWT,
};
