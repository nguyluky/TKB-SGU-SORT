var express = require('express');
var dbHandler = require('../db/databaseHandle');

var router = express.Router();

router.get('/checkLogin', function(req, res, next) {
    var uuid = req.session.user_uuid;
    if (!uuid) {        
        res.status(300).send();
        return
    }

    dbHandler.get_user(uuid, (err, result) => {
        if (err) throw err;
        var user = result[0];
        if (!user) {
            req.session.is_login = false;
            res.status(300).send();
            return;
        }
        res.status(200).send();
    });
})

router.post('/', function(req, res, next) {

    dbHandler.sign_in(req, function(err,result) {
        var user = result[0];
        if (!user) {
            res.status(300).send("Tên đăng nhập hoặc mật khẩu không đúng");
            return;
        }
        req.session.user_uuid = user.id;
        res.status(200).send('ok');
    })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("sign_in", {});
});

module.exports = router;