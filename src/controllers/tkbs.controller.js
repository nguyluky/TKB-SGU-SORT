const { request, response } = require('express');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getAblePage(req, res) {
    res.render('home', {})
}


module.exports = {
    getAblePage
}