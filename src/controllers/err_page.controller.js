
const { request, response } = require('express');

const errPages = require('../models/errPage.model')

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getPage(req, res) {
    res.render('err_page', errPages.PAGE_NOT_FOUND)
}

module.exports = {getPage}