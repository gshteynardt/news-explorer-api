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

const {
  port,
  endpoint,
} = require('./utils/config.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);
app.use(cors());
mongoose.connect(endpoint, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use('/', routers);
app.use(errorLogger);
app.use(errors());
app.use(errorsHendler);

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
