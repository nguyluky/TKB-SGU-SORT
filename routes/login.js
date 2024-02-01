
var express = require('express');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', {})
})

// sứ lý dữ diện login
router.post('/', (req, res, next) => {
    const {user, pass} = req.body
    res.send()
})

module.exports = router