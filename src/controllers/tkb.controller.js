const { request, response } = require('express');
const mysqlService = require('../services/app.service');
const errPages = require('../models/errPage.model')

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getTkbById(req, res) {
    const { tkb_id } = req.params;
    res.render("tkb", { tkb_id : tkb_id});
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function joinTkb(req, res) {

    const token = req.session.token;
    if (!token) {
        res.redirect('../sign_in')
        return;
    }
    var [err, userId] = await mysqlService.token2userId(token);
    if (err) {
        console.error(err);
        res.render('err_page', errPages.SERVER_ERROR)
        return;
    }
    if (!userId) {
        res.redirect('../sign_in')
        return;
    }

    const {id:inviteId} = req.query;
    const [err1, tkbId] = await mysqlService.inviteId2TkbId(inviteId);
    if (err1) {
        console.error(err1)
        res.render('err_page', errPages.SERVER_ERROR)
        return
    }
    if (!tkbId) {
        res.render('err_page', errPages.INVALID_INVITE)
        return
    }
    const [err2, result] = await mysqlService.addUserToTkb(tkbId, userId)
    if (err2) {
        res.render('err_page', errPages.SERVER_ERROR)
        console.log(err2)
    }

    console.log(tkbId)
    const [err3, result1] = await mysqlService.deleteInviteByTkbId(tkbId);

    res.render('err_page', errPages.INVITE_SUCCESS)
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getTkbPage(req, res) {
    res.render("tkb", { tkb_id: '' });
}


module.exports = {
    getTkbById, getTkbPage, joinTkb
}