
const { request, response } = require('express');

const errCode = {
    NOLOGIN: "You are not logged in",
    TOKEN_TIME_OUT: "Login expired",
    PERMISSION: "Not have access",
    SERVER_ERR: "Lỗi máy chủ",
    BAD_REQ: "bad req"
}


/**
 * 
 * @param {response} res 
 * @param {number} err_id 
 * @param {string} err_mess 
 * @param {*} data 
 * @returns 
 */
function createResponse(res , errCode, data) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
        err: errCode ? true: false,
        err_mess: errCode,
        data: data
    }))
}

module.exports = {
    createResponse,
    errCode
}