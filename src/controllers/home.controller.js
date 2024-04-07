const { request, response } = require('express');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getHomePage(req, res) {
    res.render('about', {})
}


module.exports = {
    getHomePage
}