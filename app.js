const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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

/*
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.send('ok');
});

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'https://praktikum.tk');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const allowedCors = [
  // 'https://praktikum.tk',
  // 'http://praktikum.tk',
  'localhost:8080',
  'http://localhost:8080',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок
  // console.log(req.headers);
  if (allowedCors.includes(origin)) {
    // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});
*/

const corsOptions = {
  // origin: ['http://diploma-2020.ru', 'https://diploma-2020.ru', 'http://localhost:8080', 'http://localhost:3000'],
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET, POST, DELETE',
};

// app.options('*', cors(corsOptions));
// const whitelist = ['http://localhost:8080', 'http://example2.com']
// const corsOptions = {
//   origin = function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// };
app.use(cors(corsOptions));

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
