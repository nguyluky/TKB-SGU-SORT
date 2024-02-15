var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sign_inRouter = require('./routes/sign_in');
var sign_upRouter = require('./routes/sign_up');
var api_Router = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(methodOverride())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());

// static path
app.use(express.static(path.join(__dirname, 'public')));

// set port
app.set('http_port', process.env.HTTP_PORT)
app.set('https_port', process.env.HTTPS_PORT)


//set session
var sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 10
    }
}

if (process.env.DEVE === 'TRUE') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign_in', sign_inRouter);
app.use('/sign_up', sign_upRouter);
app.use('/api', api_Router)

module.exports = app;
