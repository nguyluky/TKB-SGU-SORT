const express = require('express');

const ableController = require('../controllers/tkbs.controller')

var router = express.Router();

router.get('/', ableController.getAblePage)

module.exports = router;