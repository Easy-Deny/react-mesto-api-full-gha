const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/error-handler');

const NotFoundError = require('./errors/not-found-error');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.log('Not connected to MongoDB');
  });
const app = express();
const PORT = 3500;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://easy-deny.pr15.nomoredomainsmonster.ru',
];

app.use(function (req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);
app.use(errors());
app.all('*', (req, res, next) => {
  next(new NotFoundError('404! Page not found'));
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
