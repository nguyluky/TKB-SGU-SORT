var express = require('express');
var dbHandler = require('../db/databaseHandle');
var router = express.Router();

router.post('/', function(req, res, next) {
    dbHandler.sign_up(req, function(err,result) {
        if (err) {
            var mess;
            if (err.code == "ER_DUP_ENTRY") mess = "Tên đăng nhập đã tồn tại"
            else mess = err.code;
            res.status(300).send(mess);
            return;
        };
        res.status(200).send('ok');
    });
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("sign_up", {});
});

module.exports = router;