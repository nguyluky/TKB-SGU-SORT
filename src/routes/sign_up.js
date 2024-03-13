const express = require('express');

const sendMail = require('../utils/email');
const signUpController = require('../controllers/sign_up.controller')

var router = express.Router();

router.post('/otp' , signUpController.handleOTP)

// NOTE check checkacc move to api

router.put('/', signUpController.createAcc)
router.get('/', signUpController.getSignUpPage);

module.exports = router;