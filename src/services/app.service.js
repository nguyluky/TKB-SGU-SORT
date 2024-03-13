const {query, escape} = require('./mysql.service');
const { v4: uuidv4 } = require('uuid');
const { token48: token } = require('../utils/app');


/**
 * 
 * @param {string} user
 * @param {string} password 
 * @param {string} email 
 * @param {string} fullName 
 * @param {string} mssv 
 * @param {string} khao 
 * @param {string} lop 
 * @returns {[Error, string]} err and uuid user
 */
async function registerAccount(user, password, email,fullName, mssv, khao, lop) {
    const uuid = uuidv4()

    const sqlCreateUserLoginInfo = `
        INSERT INTO user_login_info(username, pass, email, id, created) 
        VALUES(?,SHA1(?),?,?,NOW())
    `   
    const sqlCreateUserInfo = `
        INSERT INTO user_info(id, display_name, ma_sv, khoa, lop)
        VALUES (?,?,?,?,?)
    `

    var [err, result, fields] = await query(sqlCreateUserInfo, [uuid, fullName, mssv, khao, lop]);
    if (err) return [err, null];
    [err, result, fields] = await query(sqlCreateUserLoginInfo, [user, password, email, uuid]);

    if (err) {
        await query('DELETE FROM user_info WHERE id = ?', [uuid])
        return [err, null];
    }

    await query('UPDATE user_info SET username = ? WHERE id = ?', [user, uuid]);
    return [null, uuid];
}

/**
 * 
 * @param {string} user 
 * @param {string} password 
 * @returns {Error, user }
 */
async function login(user, password) {
    const sql = 'SELECT * FROM user_login_info WHERE username = ? AND pass = SHA1(?)';
    const [err, result, fields] = await await query(sql, [user, password])
    return [err, result[0]]
}


/**
 * 
 * @param {string} userId 
 * @returns {[Error, string]} token
 */
async function refreshToken(userId) {
    const newToken = await token();
    const [err, result, fields] = await this.setToken(userId, newToken);
    return [err, newToken];

}


async function setToken(userId, token) {
    const updateToken = `
        UPDATE user_login_info SET
        token = ?
        WHERE id = ?
        `

    return query(updateToken, [token, userId]);
}

/**
 * 
 * @param {string} token 
 * @returns {[Error|null, string|null]}
 */
async function token2userId(token) {
    const sql = `SELECT * FROM user_login_info WHERE token = ?`;
    const [err, result, fields] = await query(sql, [token]);
    if (err) return [err, null]

    var userLoginInfo = result[0];
    if (!userLoginInfo) return

    return [null, userLoginInfo.id];
}

/**
 * 
 * @param {string} userId 
 * @param {string} fullName 
 * @param {string} masv 
 * @param {string} khoa 
 * @param {string} lop 
 * @returns {[Error | null, boolean]}
 */
async function updateUserInfo(userId, fullName, masv, khoa, lop) {
    const sql = `
        UPDATE user_info SET
        display_name = ?,
        ma_sv = ?,
        khoa = ?,
        lop = ?
        WHERE id = ?;
    `

    const [err, result, fields] = await query(sql, [fullName, masv, khoa, lop, userId]);
    if (err) return [err, false];
    return [null, true]
}

async function findUserByUserName(userName) {
    const sql = `SELECT * FROM user_login_info
        WHERE username = ?`
    
    const [err, result, fields] = await query(sql, [userName]);
    if (err) return [err, null];

    return [null, result[0]];
    
}

async function findUserById(userId) {
    const sql = `
            SELECT display_name, khoa, lop, ma_sv FROM user_info
            WHERE id = ?;
        `
    
    const [err, result, fields] = await query(sql, [userId]);
    if (err) return [err, null];

    return [null, result[0]];
}


async function getDsKhoa() {
    const sql = 'SELECT * FROM ds_khoa;'

    const [err, result, fields] = await query(sql);
    if (err) return [err, null];

    return [null, result];
}

async function getDsLop() {
    const sql = 'SELECT * FROM ds_lop;'

    const [err, result, fields] = await query(sql);
    if (err) return [err, null];

    return [null, result];
}

async function saveTkb(userId, idToHocs, name, description, thumbnail) {
    const tkbId = uuidv4()
    const sql = 'INSERT INTO tkb_save VALUES (?, ?, ?, ?, ?, ?, NOW())'

    const [err, result, fields] = await query(sql, [tkbId, JSON.stringify(userId), name, description, JSON.stringify(idToHocs), thumbnail]);
    return err, tkbId
}

async function getDsTkb(userId) {
    const sql = `SELECT id, tkb_name, description, json_data, thumbnails, date_save FROM tkb_save WHERE JSON_CONTAINS(id_user, '${escape(userId).replace(/'/g, '"')}', "$")`
    const [err, result, fields] = await query(sql);

    return [err, result];
}

async function getTkb(tkbId) {
    var sql = 'SELECT id_user, tkb_name, description, json_data, date_save FROM tkb_save ' +
        'WHERE id = ?'
    
    const [err, result, fields] = await query(sql, [tkbId]);

    return [err, result[0]];
}

async function updateTkb(tkbId, idToHocs, name, description, thumbnail, userId) {
    const sql = `
        UPDATE tkb_save 
        SET tkb_name = CASE 
                WHEN ${escape(name)} IS NOT NULL THEN  ${escape(name)}
                ELSE  tkb_name
            END,
            json_data = CASE 
                WHEN ${escape(JSON.stringify(id_to_hocs))} IS NOT NULL THEN  ${escape(JSON.stringify(id_to_hocs))}
                ELSE  json_data
            END,
            description = CASE 
                WHEN ${escape(description)} IS NOT NULL THEN  ${escape(description)}
                ELSE  description 
            END,
            thumbnails = CASE 
                WHEN ${escape(thumbnail)} IS NOT NULL THEN  ${escape(thumbnail)}
                ELSE  thumbnails 
            END
        WHERE id = ${escape(id)} AND JSON_CONTAINS(id_user, '${escape(user_id).replace(/'/g, '"')}', "$")
    `
    const [err, result, fields] = await query(sql);
    return [err, result];
}

module.exports = {
    registerAccount, login, refreshToken, setToken, 
    token2userId, updateUserInfo, findUserById, findUserByUserName,
    getDsKhoa, getDsLop, saveTkb, getTkb, updateTkb, getDsTkb
}
