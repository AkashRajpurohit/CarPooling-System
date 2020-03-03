const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const api = require('./api');
require('./helpers/dbConnection');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Carpooling API 🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
