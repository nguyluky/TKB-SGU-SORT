const { request, response } = require('express');

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
async function getTkbPage(req, res) {
    res.render("tkb", { tkb_id: '' });
}


module.exports = {
    getTkbById, getTkbPage
}