const express = require('express');
const dbHandler = require('../db/databaseHandle');
const path = require('path');
const { env } = require('process');
var kickbox = require('kickbox').client(env.KICKBOX_API).kickbox();


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

router.get('/ds_khoa', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    dbHandler.get_ds_khoa((result) => {
        res.send(result)
    })
})

router.get('/ds_lop', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    dbHandler.get_ds_lop((result) => {
        res.send(result)
    })
})

router.post('/check_email', function(req, res, next) {
    const {email} = req.body;
    // console.log(email)
    kickbox.verify(email, function (err, response) {
        // console.log(response.body.result)
        if (response.body.result == 'deliverable') {
            res.status(200).send()
            return
        }
        res.status(300).send()
    });
})
module.exports = router;