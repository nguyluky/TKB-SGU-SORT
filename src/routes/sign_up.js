const express = require('express');

const sendMail = require('../utils/email');
const signUpController = require('../controllers/sign_up.controller')

var router = express.Router();


// NOTE check checkacc move to api

router.put('/', signUpController.createAcc)
router.put('/SGU', signUpController.createAccSGU)
router.get('/', signUpController.getSignUpPage);

// TODO add page
router.get('/otp', signUpController.getOtpPage)
router.post('/otp' , signUpController.handleOTP)

module.exports = router;