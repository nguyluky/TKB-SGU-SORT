require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const fs = require('fs');
const https = require('https')
const { Server } = require("socket.io");


const tkbRouter = require('./src/routes/tkb');
const usersRouter = require('./src/routes/users');
const signinRouter = require('./src/routes/sign_in');
const signupRouter = require('./src/routes/sign_up');
const apiRouter = require('./src/routes/api')
const homeRouter = require('./src/routes/home')
// const registerRouter = require('./routes/register')

const {redisStore, redisClient} = require('./src/services/redis.service')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended:  false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());

// static path
app.use(express.static(path.join(__dirname, 'public')));

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
        sameSite: 'none',
        maxAge: 1000 * 60 * 10
    }
}

if (process.env.DEVE === 'TRUE') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

const sessionMiddleware = session(sess)

app.use(sessionMiddleware)
app.set('session', sessionMiddleware)


app.use('/', homeRouter)
app.use('/tkb', tkbRouter);
app.use('/users', usersRouter);
app.use('/sign_in', signinRouter);
app.use('/sign_up', signupRouter);
app.use('/api', apiRouter)

app.all('*', (req, res) => {
    res.status(404).send("aaa")
})

var key = fs.readFileSync(path.join(__dirname , './certs/tkbsgusort.id.vn/private.key'));
var cert = fs.readFileSync(path.join(__dirname , './certs/tkbsgusort.id.vn/certificate.crt'));
var ca = fs.readFileSync(path.join(__dirname ,'./certs/tkbsgusort.id.vn/ca_bundle.crt'));
var options = {
  ca: ca,
  key: key,
  cert: cert
};



const server_https = https.createServer(options, app);
const io = new Server(server_https)

io.engine.use(app.get('session'));

function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

var https_port = app.get('https_port');

server_https.on('error', (e) => onError(e, https_port));

io.on('connection', (socket) => {

  socket.on('add', function() {
    console.log(arguments)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  console.log('ok')
});

server_https.listen(https_port, () => {
  console.log(`server start in https://localhost:${https_port}`);
});