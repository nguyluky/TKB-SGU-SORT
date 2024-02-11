var express = require('express');
var dbHandler = require('../db/databaseHandle');

var router = express.Router();

router.post('/', function(req, res, next) {

    console.log(req.body);
    // dbHandler.sign_in(req, function(err,result) {

    // })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("sign_in", {});
});

module.exports = router;