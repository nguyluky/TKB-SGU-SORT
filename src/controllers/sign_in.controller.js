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

// NOTE: replay with send ủe info 
// async function checkLogin(req, res) {
    
// }

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function login(req, res) {

    const {user: userName, password} = req.body;
    
    if (!userName || !password) {
        createResponse(res, false, "bad req")
    }

    const [err, user] = await mysqlService.login(userName, password)
    
    if (err) {
        // TODO: redirect To err page
        console.error(err)
        createResponse(res, false, "lỗi server")
        // res.status(500).send()
        return
    }


    if (!user) {
        createResponse(res, false, "tên đăng nhập mật khẩu không đúng")
        // res.status(400).send()
        return
    }


    const userId = user.id;

    const [err1, token] = await mysqlService.refreshToken(userId);

    if (err1) {
        console.error(err1)
        res.status(500).send()
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
    res.render("sign_in", {});
}

module.exports = {
    lignOut, login, getLoginPage
}