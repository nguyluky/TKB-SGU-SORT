var express = require('express');
var dbHandler = require('../db/databaseHandle')

var router = express.Router();

router.get('/:tkb_id', function (req, res, next) {
    const { tkb_id } = req.params;
    var token = req.session.token;

    if (!token) {
        res.render('noPermission', {})
        return
    }

    dbHandler.get_tkb(tkb_id, (err, result) => {
        var tkb = result[0];
        console.log(err)
        if (!tkb) {
            res.render('noPermission', {})
            return
        }
        var id_user = JSON.parse(tkb.id_user);

        dbHandler.get_user_id_form_token(token, (err, result) => {
            if (id_user.includes(result)) {
                tkb.id_user = null;
                console.log(JSON.stringify(tkb))
                res.render("tkb", { json_data: tkb });
            }
            else {
                res.render('noPermission', {})
            }
        })
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
    // console.log(whoami)
    res.render("tkb", { json_data: {} });
});

module.exports = router;