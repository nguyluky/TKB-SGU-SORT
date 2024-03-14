const express = require('express');


const errPageController = require('../controllers/err_page.controller')
// NOTE: xong
// NOTE: chua check
var router = express.Router();


router.get('/', errPageController.getPage)

module.exports = router