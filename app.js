var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// Charger les variables d'environnement
require('dotenv').config();

// Récupérer les informations de connexion en fonction de l'environnement
const dbHost = process.env.STATUS === 'prod'
  ? process.env.DB_HOST_PROD
  : process.env.DB_HOST_DEV;
const dbName = process.env.STATUS === 'prod'
  ? process.env.DB_NAME_PROD
  : process.env.DB_NAME_DEV;
const dbUser = process.env.STATUS === 'prod'
  ? process.env.DB_USER_PROD
  : process.env.DB_USER_DEV;
const dbPass = process.env.STATUS === 'prod'
  ? process.env.DB_PASS_PROD
  : process.env.DB_PASS_DEV;

// Connexion à MongoDB
const dbURI = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const userRoutes = require('./routes/user.rootes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/user', userRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
