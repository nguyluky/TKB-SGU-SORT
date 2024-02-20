var express = require('express');
var dbHandler = require('../db/databaseHandle')

var router = express.Router();

router.get('/:tkb_id', function(req, res, next) {
  const {tkb_id} = req.params;
  var token = req.session.token;

  if (!token) {
    res.render("tkb", {id_to_hoc: []  , file_name: null});
    return
  }

  dbHandler.get_tkb(tkb_id, (err, result) => {
    var tkb = result[0];
    if (!tkb) {
      res.render("tkb", {id_to_hoc: []  , file_name: null});
      return
    }
    var id_user = tkb.id_user;

    dbHandler.get_user_id_form_token(token, (err, result) => {
      if (result == id_user) {
        res.render("tkb", {id_to_hoc: ["-5953224805198452669"], file_name: 'test'});
      }
      else {
        res.render("tkb", {id_to_hoc: []  , file_name: null});
      }
    })
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(whoami)
  res.render("tkb", {id_to_hoc: []  , file_name: null});
});

module.exports = router;