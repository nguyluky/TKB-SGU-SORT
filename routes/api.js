const express = require('express');
const dbHandler = require('../db/databaseHandle');
const path = require('path');

var router = express.Router();

const cachePath = path.join(__dirname, '../cache')

// ? chuse test
router.post('/dshocphan', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.sendFile('locdsnhomto.json', {root: cachePath})
})

router.post('/get_user_info', (req, res, next) => {
    var token = req.session.token;
    dbHandler.check_token(token, (err, result) => {
        if (err) throw err;
        
        const user = result[0];
        if (!user) return;
        dbHandler.get_user_info(user.id , (err, result) => {
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json')
            res.send(result[0])
        })
    })
})

module.exports = router;