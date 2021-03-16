const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

const googledocsapi = require('./middleware/googledocs.api.middleware');
const prerenderMiddleware = require('./middleware/prerender.middleware');

const indexRouter = require('./routes/index');
const proxyServerRouter = require('./routes/proxy');
const signUpRouter = require('./routes/signup');
const usersRouter = require('./routes/users');
const newsFeedRouter = require('./routes/newsfeed');
const albumFeedRouter = require('./routes/albumfeed');
const signInRouter = require('./routes/signIn');
const sheet1Router = require('./routes/sheet1');
const torqueRouter = require('./routes/torqueRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(googledocsapi);

// app.use('/ng', prerenderMiddleware);


app.use('/', indexRouter);
app.use('/proxy', proxyServerRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/users', usersRouter);
app.use('/newsfeed', newsFeedRouter);
app.use('/albumfeed', albumFeedRouter);
app.use('/sheet1', sheet1Router);

app.use('/%F0%9F%9A%97', torqueRouter); // /🚗
app.use(express.static(path.join(__dirname, 'public')));
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
