const db = require('./db');

module.exports = {
    sign_up: (req, callback) => {
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
    sign_in: (req, callback) => {
        const {user, password} = req.body;
        const sql = `SELECT * FROM user_login_info WHERE username = '${user}' AND pass = SHA1('${password}');`;
        db.query(sql, callback);
    }
}