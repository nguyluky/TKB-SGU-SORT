const db = require('./db');

module.exports = {
    sign_up: function (req, callback) {
        const {user, password, email} = req.body;

        const sql_get_uuid = 'SELECT UUID() AS UUID_Value;'

        db.query(sql_get_uuid, (err, result) => {
            if (err) throw err;
            const uuid = result[0].UUID_Value;

            const sql_craft_user_login = `INSERT INTO user_login_info(username, pass, email, id, created) VALUES(
                '${user}',
                SHA1('${password}'),
                ${email ? "'" + email + "'" : 'NULL'},
                '${uuid}',
                NOW()
            );`;

            const sql_craft_user_info = `
            INSERT INTO user_info(id) VALUES(
                '${uuid}'
            );`
            
            db.query(sql_craft_user_info, (err, result) => {
                if (err) throw err;
                db.query(sql_craft_user_login, (err, result) => {
                    if (err) {
                        db.query(`DELETE FROM user_info WHERE id = '${uuid}';`, (err, result) => {
                            if (err) throw err;
                        });
                        callback(err, result);
                        return;
                    };
                    db.query(`UPDATE user_info SET username = '${user}' WHERE id = '${uuid}';`, callback)
                });
                
            })

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

    // không có dùng
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
    }




}