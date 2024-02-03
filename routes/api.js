var express = require('express');
var router = express.Router();
const path = require('path');

const cachePath = path.join(__dirname, '../cache')

// ? chuse test
router.post('/dshocphan', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.sendFile('locdsnhomto.json', {root: cachePath})
})

module.exports = router;