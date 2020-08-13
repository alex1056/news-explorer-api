const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const helmet = require('helmet');
const limiter = require('./middlewares/express-rate-limiter.js');

const router = require('./routes');

const errHandler = require('./middlewares/err-handler.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  MONGO_HOST_DEV,
  MONGO_PORT_DEV,
  DB_NAME_DEV,
} = require('./config');

const {
  PORT = 3000, MONGO_HOST = MONGO_HOST_DEV, MONGO_PORT = MONGO_PORT_DEV, DB_NAME = DB_NAME_DEV,
} = process.env;
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
