const db = require('./db');
const { v4: uuidv4 } = require('uuid');
// makeuuid
// 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed

module.exports = {
    sign_up: function (req, callback) {
        const {user, password, email, display_name, ma_sv, khoa, lop} = req.body;
        
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

        const uuid = uuidv4()

        const sql_create_user_login_info = `
            INSERT INTO user_login_info(username, pass, email, id, created) 
            VALUES(
                '${user}',
                SHA1('${password}'),
                ${email ? "'" + email + "'" : 'NULL'},
                '${uuid}',
                NOW()
            )
        `   
        const sql_create_user_info = `
        INSERT INTO user_info(id, display_name, ma_sv, khoa, lop)
        VALUES (
            '${uuid}',
            '${display_name}',
            ${ma_sv ? "'" + ma_sv + "'" : 'NULL'},
            ${khoa ? "'" + khoa + "'" : 'NULL'},
            ${lop ? "'" + lop + "'" : 'NULL'}
        )
        `
        db.query(sql_create_user_info, (err, result) => {
            db.query(sql_create_user_login_info, (err, result) => {
                if (err) {
                    db.query(`DELETE FROM user_info WHERE id = '${uuid}';`, (err, result) => {
                        if (err) throw err;
                    });
                    callback(err, result);
                    return;
                };
                db.query(`UPDATE user_info SET username = '${user}' WHERE id = '${uuid}';`, (err, result) => callback(err, uuid))
            });
            
        })

    },
    sign_in: function (req, callback) {
        const {user, password} = req.body;
        const sql = `SELECT * FROM user_login_info WHERE username = '${user}' AND pass = SHA1('${password}');`;
        db.query(sql, callback);
    },
    get_user: function (uuid, callback) {
        const sql = `SELECT * FROM user_info WHERE id = '${uuid}';`;
        db.query(sql, callback);
    },
    create_token: function (user_id, callback) {
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
        token = '${token}'
        WHERE id = '${user_id}';
        `

        db.query(update_token, (err, result) => {
            callback(err, result)
        })
    },
    check_token: function (token, callback) {
        const sql = `SELECT * FROM user_login_info WHERE token = '${token}';`;
        db.query(sql, callback);
    },
    clear_token: function(token, callback) {
        const sql = `
            UPDATE user_login_info 
            SET token = NULL
            WHERE token = '${token}';
            `

        db.query(sql, (err, result) => {
            if (err) throw err;

            callback(err, result)
        })
    },
    update_info: function (data, callback) {
        var {display_name, ma_sv, khoa, lop, uuid} = data;

        const sql = `
            UPDATE user_info SET
            display_name = '${display_name}',
            ma_sv = ${ma_sv ? "'" + ma_sv + "'": 'NULL'},
            khoa = ${khoa ? "'" + khoa + "'": 'NULL'},
            lop = ${lop ? "'" + lop + "'": 'NULL'}
            WHERE id = '${uuid}';
        `

        db.query(sql, (err, result) => {
            callback(err, result)
        })
        // console.log(sql)

    },
    check_have_acc: function(name, callback) {
        const sql = `SELECT COUNT(*) FROM user_login_info
        WHERE username = '${name}';`

        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    get_user_info: function(uuid, callback) {
        const sql = `
            SELECT display_name, khoa, lop, ma_sv FROM user_info
            WHERE id = '${uuid}';
        `

        db.query(sql, (err, result) => {
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
    get_check_
    
}