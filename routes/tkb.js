var express = require('express');
var dbHandler = require('../db/databaseHandle')

var router = express.Router();

router.get('/:tkb_id', function (req, res, next) {
    const { tkb_id } = req.params;
    var token = req.session.token;

    if (!token) {
        res.render("tkb", { json_data: {} });
        return
    }

    dbHandler.get_tkb(tkb_id, (err, result) => {
        var tkb = result[0];
        if (!tkb) {
            res.render("tkb", { json_data: {} });
            return
        }
        var id_user = tkb.id_user;

        dbHandler.get_user_id_form_token(token, (err, result) => {
            if (result == id_user) {
                console.log(JSON.stringify(tkb))
                res.render("tkb", { json_data: tkb });
            }
            else {
                res.render("tkb", { json_data: {} });
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