const { request, response } = require('express');

const mysqlService = require('../services/app.service')


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
    
    const [err, user] = await mysqlService.login(userName, password)
    
    if (err) {
        // TODO: redirect To err page
        console.error(err)
        res.status(500).send()
        return
    }


    if (!user) {
        res.status(400).send()
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
    res.status(200).redirect('/')
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