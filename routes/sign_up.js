var express = require('express');
var dbHandler = require('../db/databaseHandle');
var router = express.Router();

router.post('/checkacc', function(req, res, next) {
    var {user_name} = req.body;
    console.log(user_name)
    dbHandler.check_have_acc(user_name, (err, result) => {
        console.log(result[0]['COUNT(*)'])
        if (result[0]['COUNT(*)'] == 0) {
            res.status(200).send()

            return
        }

        res.status(300).send()

    })
})

// create acc
// NOTE: tạm thời khi người dùng sign_up thì client
    // gửi 2 yêu cầu req
    // cái thứ nhất gửi req tại tài khoản
    // cái thứ 2 gửi sau cái thứ nhất là cập nhật thông tin
router.put('/', function(req, res, next) {
    dbHandler.sign_up(req, function(err,result) {
        if (err) {
            var mess;
            if (err.code == "ER_DUP_ENTRY") mess = "Tên đăng nhập đã tồn tại"
            else mess = err.code;
            res.status(300).send(mess);
            return;
        };
        console.log(result)
        req.session.uuid = result
        res.status(200).send('ok');
    });
})

// update info
router.post('/', function(req, res, next) {
    dbHandler.update_info({
        uuid: req.session.uuid,
        ...req.body
    }, (err, result) => {
        res.send(err)
    })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("sign_up", {});
});

module.exports = router;