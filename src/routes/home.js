const express = require('express');

const homeController = require('../controllers/home.controller')

var router = express.Router();

router.get('/', homeController.getHomePage)

module.exports = router;