var express = require('express');
var dbHandler = require('../db/databaseHandle');

var router = express.Router();


router.get('/log_out' , function(req, res, next) {
    var token = req.session.token;
    dbHandler.clear_token(token, (err, result) => {
        res.status(200).send()
    })
})

router.get('/checkLogin', function(req, res, next) {
    var token = req.session.token;
    // console.log("🚀 ~ router.get ~ uuid:", uuid)
    // console.log("🚀 ~ dbHandler.create_token ~ req.session.id:", req.session.id)

    if (!token) {        
        res.status(300).send();
        return
    }

    dbHandler.check_token(token, (err, result) => {
        if (err) throw err;
        var uuid = result[0];
        if (!uuid) {
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

        dbHandler.create_token(user.id, (err , token, result) => {
            req.session.token = token;
            console.log(req.session.token)
            res.status(200).send('ok');
        })
            
    })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("sign_in", {});
});

module.exports = router;