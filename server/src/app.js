const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// ====================================================
const router = require('./routers');
// ====================================================

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api', router);

module.exports = app;
