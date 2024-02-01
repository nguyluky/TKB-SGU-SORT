var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sign_inRouter = require('./routes/sign_in');
var sign_upRouter = require('./routes/sign_up');
var login = require("./routes/login")

var app = express();

var port = process.env.PORT || '3000'
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(methodOverride())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static path
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign_in', sign_inRouter);
app.use('/sign_up', sign_upRouter);
app.use('/login', login)

module.exports = app;
