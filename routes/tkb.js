var express = require('express');

var router = express.Router();

router.get('/:tkb_name', function(req, res, next) {
  const {tkb_name} = req.params;
  console.log(tkb_name)
  res.send()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(whoami)
  res.render("tkb", {});
});

module.exports = router;