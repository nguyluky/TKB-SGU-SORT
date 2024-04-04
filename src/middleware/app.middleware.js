const {query, escape} = require('../services/mysql.service');
const {token2userId} = require('../services/app.service')
const mysqlService = require('../services/app.service')

/**
 * 
 * @param {string} user tên người dùng
 * @param {string} password mật khẩu
 * @returns {string} err code null nếu mật hợp lệ không là lỗi
 */

function validAccountPassword(user, password) {
    if (user.includes(' ')) {
        return {"userErr": "Tên người dùng kông được có khảon cách"}
    }

    if (password.includes(' ')){
        return {"passErr": "Mật khẩu không được có khoản cách"}
    }

    if (user.length < 5) { 
        return {"userErr": "Tên người dùng quá ngắn"}
    }

    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(user)) {
        return {"userErr": "Tên đăng nhậm không được chứa ký tự đặp biệt."}
    }

    return {}
}


async function checkPermissionTkb(tkbId, userId) {
    const sql = `SELECT tkb_name, description, json_data, date_save  FROM tkb_save WHERE JSON_CONTAINS(id_user, '${escape(userId).replace(/'/g, '"')}', "$") AND id=${escape(tkbId)}`

    const [err, result, fields] = await query(sql)
    
    if (err) return false;

    return result.length;
    
}

async function checkLogin(token) {
    const [err, userId] = await token2userId(token);
    if (err) return false;
    if (userId) return true;
    return false;
}

async function checkEmailAlreadyExists(email) {
    const sql = `SELECT * FROM user_login_info
    WHERE email = ?`

    const [err, result, fields] = await query(sql, [email])
    
    if (err) return false;

    return result.length;
    
}

async function checkUserNameAlreadyExists(userName) {
    const [err, user] = await mysqlService.findUserByUserName(userName)

    if (err) {
        return false
    }

    if (user) {
        return true
    }

    return false
}



module.exports = {
    checkEmailAlreadyExists, 
    checkPermissionTkb,
    validAccountPassword,
    checkLogin,
    checkUserNameAlreadyExists
}