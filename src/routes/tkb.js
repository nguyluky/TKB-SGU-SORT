const express = require('express');

const tkbController = require('../controllers/tkb.controller')

var router = express.Router();


router.get('/invite', tkbController.joinTkb)
router.get('/:tkb_id', tkbController.getTkbById)
router.get('/', tkbController.getTkbPage);

module.exports = router;