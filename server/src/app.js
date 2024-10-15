const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// ==============================================================
const router = require('./routers');
// ==============================================================
const {
  CLIENT: { URL },
} = require('./constants');
// ==============================================================
const {
  time: { getTime, showTime },
} = require('./middlewares');
const {
  errorHandlers: {
    validationErrorHandler,
    sequelizeErrorHandler,
    errorHandler,
  },
} = require('./middlewares');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: URL,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(getTime, showTime);

app.use(morgan('dev'));

app.use('/api', router);

app.use(validationErrorHandler, sequelizeErrorHandler, errorHandler);

module.exports = app;
