
const { response } = require('express');


const ERR_LOCATION = {
    USER_NAME: "username",
    PASSWORD: "pass",
    EMAIL: "email",
    FULL_NAME: "display_name",
    MSSV: "mssv",
    KHOA: "khoa",
    LOP: 'lop',
    OTP: 'otp'
}

/**
 * 
 * @param {response} res 
 * @param {string} errLocation 
 * @param {string} errMess  
 */

function createResponse(res, errLocation, errMess) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(
        {
            success: !(errLocation || errMess),
            errLocation: errLocation,
            errMess: errMess
        }))
}

module.exports = {createResponse, ERR_LOCATION}