const db = require('./db');
const { v4: uuidv4 } = require('uuid');
// makeuuid
// 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed

module.exports = {
    sign_up: function (user, password, email, display_name, ma_sv, khoa, lop, callback) {
        
        if (user.includes(' ')) {
            callback({code: "Tên đăng nhập không hợp lệ"}, {})
            return
        }

        if (password.includes(' ')){
            callback({code: "Mật khẩu không hợp lệ"}, {})
            return
        }

        if (user.length < 5) {
            callback({code: "Tên đăng nhập quá ngắn"}, {})
            return
        }
        
        console.log(user, password, email, display_name, ma_sv, khoa, lop)
        const uuid = uuidv4()

        const sql_create_user_login_info = `
            INSERT INTO user_login_info(username, pass, email, id, created) 
            VALUES(?,SHA1(?),?,?,NOW())
        `   
        const sql_create_user_info = `
            INSERT INTO user_info(id, display_name, ma_sv, khoa, lop)
            VALUES (?,?,?,?,?)
        `

        db.query(sql_create_user_info, [uuid, display_name, ma_sv, khoa, lop], (err, result) => {
            db.query(sql_create_user_login_info, [user, password, email, uuid],(err, result) => {
                if (err) {
                    db.query('DELETE FROM user_info WHERE id = ?', [uuid], (err, result) => {
                        if (err) throw err;
                    });
                    callback(err, result);
                    return;
                };
                db.query('UPDATE user_info SET username = ? WHERE id = ?', [user, uuid], (err, result) => callback(err, uuid))
            });
            
        })

    },
    sign_in: function (req, callback) {
        const {user, password} = req.body;
        // TODO: chưa tính tới trường hợp pass null
        const sql = `SELECT * FROM user_login_info WHERE username = ? AND pass = SHA1(?)`;
        db.query(sql, [user, password], callback);
    },
    get_user: function (uuid, callback) {
        const sql = `SELECT * FROM user_info WHERE id = ?`;
        db.query(sql, [uuid],callback);
    },
    create_token: function (user_id, callback) {
        // TODO: đổi thành token 48
        const sql_get_uuid = 'SELECT UUID() AS UUID_Value;'
        db.query(sql_get_uuid, (err, result) => {
            if (err) throw err;
            const new_token = result[0].UUID_Value;

            this.set_token(user_id, new_token, (err, result) => {
                callback(err, new_token, result)
            });
        })
    },
    set_token: function (user_id, token, callback) {
        const update_token = `
        UPDATE user_login_info SET
        token = ?
        WHERE id = ?
        `

        db.query(update_token, [token, user_id], (err, result) => {
            callback(err, result)
        })
    },
    get_user_id_form_token: function (token, callback) {
        this.check_token(token, (err, result) => {
            if (!result[0]) {
                callback(err, null)
                return
            }
            callback(err, result[0].id)
        })
    },
    check_token: function (token, callback) {
        const sql = `SELECT * FROM user_login_info WHERE token = ?`;
        db.query(sql, [token], callback);
    },
    clear_token: function(token, callback) {
        const sql = `
            UPDATE user_login_info 
            SET token = NULL
            WHERE token = ?
            `

        db.query(sql, [token],(err, result) => {
            if (err) throw err;

            callback(err, result)
        })
    },
    update_info: function (data, callback) {
        var {display_name, ma_sv, khoa, lop, uuid} = data;

        const sql = `
            UPDATE user_info SET
            display_name = ?,
            ma_sv = ?,
            khoa = ?,
            lop = ?
            WHERE id = ?;
        `

        db.query(sql, [display_name, ma_sv, khoa, lop, uuid],(err, result) => {
            callback(err, result)
        })
    },
    check_have_acc: function(name, callback) {
        const sql = `SELECT COUNT(*) FROM user_login_info
        WHERE username = ?`

        db.query(sql, [name],(err, result) => {
            callback(err, result)
        })
    },
    get_user_info: function(uuid, callback) {
        const sql = `
            SELECT display_name, khoa, lop, ma_sv FROM user_info
            WHERE id = ?;
        `

        db.query(sql, [uuid],(err, result) => {
            if (err) {
                throw err
            }
            callback(err, result)
        })
    },
    get_ds_khoa: function(callback) {
        const sql = 'SELECT * FROM ds_khoa;'

        db.query(sql, (err, result) => {
            if (err) throw err;
            callback(result)
        })

    },
    get_ds_lop: function(callback) {
        const sql = 'SELECT * FROM ds_lop;'
        db.query(sql, (err, result) => {
            if (err) throw err;
            callback(result)
        })
    },
    save_tkb: function(uuid, id_to_hocs, name, description, thumbnail,callback) {
        var tkb_id = uuidv4()
        var sql = 'INSERT INTO tkb_save VALUES (?, ?, ?, ?, ?, ?, NOW())'
        
        db.query(sql, [tkb_id, uuid, name , description,JSON.stringify(id_to_hocs), thumbnail], callback)
    },
    get_ds_tkb: function(uuid, callback) {
        var sql = 'SELECT id, tkb_name, description, json_data, thumbnails, date_save FROM tkb_save WHERE id_user = ?'

        db.query(sql, [uuid], callback)
    },
    get_tkb: function(uuid, callback) {
        var sql = 'SELECT id_user, tkb_name, description, json_data, date_save FROM tkb_save ' +
        'WHERE id = ?'

        db.query(sql, [uuid], callback)
    },
    update_tkb: function(uuid, id_to_hocs, name, thumbnail,callback) {
        
    },
    check_have_email: function(email, callback) {
        const sql = `SELECT COUNT(*) FROM user_login_info
        WHERE email = ?`

        db.query(sql, [email],(err, result) => {
            callback(err, result)
        })

    } 
    
}