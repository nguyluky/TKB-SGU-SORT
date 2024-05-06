const express = require('express');

const tkbRouter = require('./tkb');
const usersRouter = require('./users');
const signinRouter = require('./sign_in');
const signupRouter = require('./sign_up');
const apiRouter = require('./api');
const homeRouter = require('./home');
const errPageRouter = require('./err_page')
const tkbsRouter = require('./tkbs')


var router = express.Router();

router.use('/', homeRouter)
router.use('/tkb', tkbRouter);
router.use('/tkbs', tkbsRouter);
router.use('/users', usersRouter);
router.use('/sign_in', signinRouter);
router.use('/sign_up', signupRouter);
router.use('/api', apiRouter)
router.use('/err_page', errPageRouter)

module.exports = router