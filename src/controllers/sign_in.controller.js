const { request, response } = require('express');

const mysqlService = require('../services/app.service')
const createResponse = require('../models/signInRes.model')

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function lignOut(req, res) {
    req.session.destroy()
    res.status(200).send('ok')
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function login(req, res) {

    const { user: userName, password } = req.body;

    if (!userName || !password) {
        createResponse(res, false, "bad req")
        return
    }

    const [err, user] = await mysqlService.login(userName, password)

    if (err) {
        createResponse(res, false, "lỗi server")
        return
    }


    if (!user) {
        createResponse(res, false, "tên đăng nhập mật khẩu không đúng")
        return
    }

    const userId = user.id;

    const [err1, token] = await mysqlService.refreshToken(userId);

    if (err1) {
        createResponse(res, false, "lỗi server")
        return
    }

    req.session.token = token;
    createResponse(res, true, "đăng nhập thành công")
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getLoginPage(req, res) {
    if (req.query.type == "SGU") {
        res.render("login_use_school.ejs", {});
        return
    }
    res.render("sign_in", {});
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getForgetPasswordPage(req, res) {
    res.render('forgot_password')
}

module.exports = {
    lignOut, login, getLoginPage, getForgetPasswordPage
}