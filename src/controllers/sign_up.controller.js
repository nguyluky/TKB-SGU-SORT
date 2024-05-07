const { request, response } = require('express');

const mysqlService = require('../services/app.service')
const generateOTP = require('../utils/otp')
const errPage = require('../models/errPage.model')
const { createResponse, ERR_LOCATION } = require('../models/signUpRes.model')
const { validAccountPassword, checkEmailAlreadyExists, checkUserNameAlreadyExists } = require('../middleware/app.middleware');
const { sendOtp } = require('../utils/email');
const { validateEmail } = require('../utils/app');
const { getUserToken, getUserInfo } = require('../utils/sgu_api');
const logger = require('../utils/logger');


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function handleOTP(req, res) {
    const otpClient = req.body.otp;
    const otpStore = req.session.otpCode;

    if (otpStore != otpClient) {
        createResponse(res, ERR_LOCATION.OTP, "Mã xác nhận không đúng");
        return
    }

    var { user, password, email, display_name, ma_sv, khoa, lop } = req.session.userInfoCache;


    display_name == undefined ? display_name = "" : "";
    ma_sv == undefined ? display_name = "" : "";
    khoa == undefined ? display_name = "" : "";
    lop == undefined ? display_name = "" : "";


    // create acc
    const [err, userId] = await mysqlService.registerAccount(user, password, email, display_name, ma_sv, khoa, lop);

    if (err) {
        createResponse(res, null, "server err");
        return
    }


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

    const { user, password, email, display_name, ma_sv, khoa, lop } = req.body;


    const { userErr, passErr } = validAccountPassword(user, password);
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

    if (!validateEmail(email)) {
        createResponse(res, ERR_LOCATION.EMAIL, "Email không hợp lệ.")
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
async function createAccSGU(req, res) {
    const { userName, pass } = req.body;
    var a = await getUserToken(userName, pass);
    if (!a) {
        createResponse(res, "user-name", "Lỗi server");
        return
    }

    var data = JSON.parse(a);
    if (data.code == 403) {
        createResponse(res, "user-name", "MK hoặc tài khoản không đúng")
        return
    }

    const token = data.access_token;

    if (!token) {
        createResponse(res, "user-name", "Lỗi server");
        return
    }

    var data = JSON.parse(await getUserInfo(token))
    if (data.result == false) {
        createResponse(res, "user-name", "Lỗi server");
        return
    }

    // TODO: convert nganh to id khoa
    const { ten_day_du: displayName, email, ma_sv, khoi: lop, nganh: khoa } = data.data;

    logger.debug('>> create account use SGU %s, %s, %s, %s, %s, ', displayName, email, ma_sv, lop, khoa)

    // create acc
    const [err, userId] = await mysqlService.registerAccount(userName, pass, email, displayName, ma_sv, null, null, "SGU");

    if (err) {
        createResponse(res, null, "server err");
        return
    }


    req.session.destroy()
    createResponse(res, null,);
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
    if (!req.session.otpCode) {
        res.render('err_page', errPage.PAGE_NOT_FOUND)
        return
    }

    res.render('otp')
}

module.exports = {
    handleOTP, createAcc, getSignUpPage, getOtpPage, createAccSGU
}