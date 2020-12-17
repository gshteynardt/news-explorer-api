const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const routers = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHendler = require('./middlewares/errorsHendler');
const { devUrl } = require('./utils/config');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(limiter);
app.use(cors());
mongoose.connect(devUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use('/', routers);
app.use(errorLogger);
app.use(errors());
app.use(errorsHendler);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
