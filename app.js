const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')

const tkbRouter = require('./routes/tkb');
const usersRouter = require('./routes/users');
const signinRouter = require('./routes/sign_in');
const signupRouter = require('./routes/sign_up');
const apiRouter = require('./routes/api')
const homeRouter = require('./routes/home')
// const registerRouter = require('./routes/register')

// TODO: add redisStore
const {redisStore, redisClient} = require('./db/redis')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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

module.exports = app;
