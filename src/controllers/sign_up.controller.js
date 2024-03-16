const { request, response } = require('express');

const mysqlService = require('../services/app.service')
const generateOTP = require('../utils/otp')
const errPage = require('../models/errPage.model')
const {createResponse, ERR_LOCATION} = require('../models/signUpRes.model')
const {validAccountPassword, checkEmailAlreadyExists, checkUserNameAlreadyExists} = require('../middleware/app.middleware');
const {sendOtp} = require('../utils/email')


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function handleOTP(req, res) {
    const otpClient = req.body.otp;
    const otpStore = req.session.otpCode;

    console.log(otpClient, otpStore)

    if (otpStore != otpClient) {
        createResponse(res, ERR_LOCATION.OTP, "Mã xác nhận không đúng");
        return
    }

    const {user, password, email, display_name, ma_sv, khoa, lop} = req.session.userInfoCache;

    // create acc
    const [err, userId] = await mysqlService.registerAccount(user, password, email, display_name, ma_sv, khoa, lop);

    if (err) {
        console.error(err)
        createResponse(res, null, "server err");
        return
    }


    // TODO: thêm phần thông báo
    req.session.destroy()
    createResponse(res, null,);
}

// NOTE: checkacc move to api


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function createAcc(req, res) {

    const {user, password, email} = req.body;


    const {userErr, passErr} = validAccountPassword(user, password);
    if (userErr) {
        createResponse(res, ERR_LOCATION.USER_NAME, userErr);
        return
    }
    if (passErr) {
        createResponse(res, ERR_LOCATION.PASSWORD, passErr);
        return
    }

    const EC = await checkEmailAlreadyExists(email);
    if (EC) {
        createResponse(res, ERR_LOCATION.EMAIL, "Email đã được sử dụng");
        return
    }

    const UC = await checkUserNameAlreadyExists(user);
    if (UC) {
        createResponse(res, ERR_LOCATION.USER_NAME, "Tên đang nhập đã tồn tại");
        return
    }


    const otp = await generateOTP();
    req.session.userInfoCache = req.body;
    req.session.otpCode = otp;

    sendOtp(email, otp, user);

    createResponse(res, null, null);
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getSignUpPage(req, res) {
    res.render("sign_up", {});
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getOtpPage(req, res) {
    console.log(req.session.otpCode)
    if (!req.session.otpCode) {
        res.render('err_page', errPage.PAGE_NOT_FOUND)
        return
    }

    res.render('otp')
}

module.exports = {
    handleOTP, createAcc, getSignUpPage, getOtpPage
}