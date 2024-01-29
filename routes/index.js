var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {whoami} = req.query;
  console.log(whoami)
  res.render("index", {title: "hello", whoami: whoami});
  // res.status(200).send()
});

module.exports = router;