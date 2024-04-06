const express = require('express');

const signInController = require('../controllers/sign_in.controller')

var router = express.Router();


router.get('/log_out' , signInController.lignOut);


router.post('/', signInController.login)

/* GET home page. */
router.get('/', signInController.getLoginPage);

router.get('/forget_password', signInController.getForgetPasswordPage)

module.exports = router;