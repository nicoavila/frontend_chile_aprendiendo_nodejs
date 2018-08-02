const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usuarios');

//Inicia Express
const app = express();

//Inicia el View Engine (Handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Configuración de Express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configuración de rutas
app.use('/', indexRouter);
app.use('/usuarios', usersRouter);

//Catch de error 404
app.use(function(req, res, next) {
  next(createError(404));
});

//Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
