const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const {
  API_CONFIG: { CLIENT_URL },
} = require('./constants');
const {
  time: { getTime, showTime },
} = require('./middlewares');
const {
  errorHandlers: {
    authErrorHandler,
    generalErrorHandler,
    validationErrorHandler,
    sequelizeErrorHandler,
    errorHandler,
  },
} = require('./middlewares');

const router = require('./routers');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(getTime, showTime);

app.use(morgan('dev'));

app.use('/api', router);

app.use(
  authErrorHandler,
  generalErrorHandler,
  validationErrorHandler,
  sequelizeErrorHandler,
  errorHandler
);

module.exports = app;
