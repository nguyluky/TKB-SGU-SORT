require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const fs = require('fs');
const https = require('https')

if (process.env.DEV === 'TRUE') var http = require('http')
const { Server } = require("socket.io");

const routes = require('./src/routes/index')

const errPages = require('./src/models/errPage.model')

const { redisStore, redisClient } = require('./src/services/redis.service')
const ioController = require('./src/controllers/io.controller')

const Logger = require('./src/utils/logger')


var app = express();

// express setup
app.use(logger('common'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// static folder setup 
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/svg', express.static(path.join(__dirname, 'public/svg')));

// set port
app.set('http_port', process.env.HTTP_PORT)
app.set('https_port', process.env.HTTPS_PORT)

//set session
var sess = {
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  }
}

if (process.env.DEV !== 'TRUE') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

const sessionMiddleware = session(sess)
app.use(sessionMiddleware)

// router setup
app.use('/', routes)

// 404 page
app.all('*', (req, res) => {
  res.status(404)
  res.render('err_page', errPages.PAGE_NOT_FOUND)
})


// https
const options = {
  ca: fs.readFileSync(path.join(__dirname, './certs/ca_bundle.crt')),
  key: fs.readFileSync(path.join(__dirname, './certs/private.key')),
  cert: fs.readFileSync(path.join(__dirname, './certs/certificate.crt'))
};

const server_https = https.createServer(options, app);
if (process.env.DEV === 'TRUE') var server_http = http.createServer(app)
const io = new Server(server_https)

io.engine.use(sessionMiddleware);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof https_port === 'string'
    ? 'Pipe ' + https_port
    : 'Port ' + https_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      Logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

var https_port = process.env.HTTPS_PORT;
if (process.env.DEV === 'TRUE') var http_port = process.env.HTTP_PORT;

server_https.on('error', onError);

io.on('connection', ioController);

if (process.env.DEV === 'TRUE') server_http.listen(http_port, () => {
  Logger.info('>> server start in http://localhost:%s', http_port)
})

server_https.listen(https_port, () => {
  Logger.info('>> server start in https://localhost:%s', https_port)
});