const express = require('express');
const path = require('path');
const fs = require('fs');
const { env } = require('process');
const kickbox = require('kickbox').client(env.KICKBOX_API).kickbox();
const cache = require('../db/cache')

const dbHandler = require('../db/databaseHandle');


var router = express.Router();

const cachePath = path.join(__dirname, '../cache')

// resp_templay
// resq = {
//     err_mess: String,
//     data: Object
// }

const mess_code = {
    NOLOGIN: "You are not logged in",
    TOKEN_TIME_OUT: "Login expired"
}



// ? chuse test
router.post('/dshocphan', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')

    
    function read_file() {
        return fs.readFileSync(path.join(cachePath , 'locdsnhomto.json'), 'utf-8')
    }
    

    json_file = await cache(read_file)()

    // console.log(json_file)
    res.send(json_file)

})

router.post('/get_user_info', (req, res, next) => {
    var token = req.session.token;
    if (!token) {
        res.setHeader('Content-Type', 'application/json')
        res.send({
            err_mess: mess_code.NOLOGIN,
            data: {}
        })
        return
    }
    dbHandler.check_token(token, (err, result) => {
        if (err) throw err;
        
        const user = result[0];
        if (!user) {
            res.setHeader('Content-Type', 'application/json')
            res.send(
                {
                    err_mess: mess_code.TOKEN_TIME_OUT,
                    data: {}
                }
            )
            return
        };
        dbHandler.get_user_info(user.id , (err, result) => {
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json')
            res.send({
                err_mess: null,
                data: result[0]
            })
        })
    })
})

router.get('/ds_khoa', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    dbHandler.get_ds_khoa((result) => {
        res.send({
            err_mess: null,
            data: result
        })
    })
})

router.get('/ds_lop', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    dbHandler.get_ds_lop((result) => {
        res.send({
            err_mess: null,
            data: result
        })
    })
})

router.post('/check_email', function(req, res, next) {
    const {email} = req.body;
    // console.log(email)
    kickbox.verify(email, function (err, response) {

        if (err) {
            res.status(200).send()
            return
        }
        // console.log(response.body.result)
        if (!response){ 
            res.status(200).send();
            return
        }
        if (response.body.result == 'deliverable') {
            res.status(200).send()
            return
        }
        res.status(300).send()
    });
})

router.post('/get_tkb_save', function(req, res, next) {
    const token = req.session.token;
    res.setHeader('Content-Type', 'application/json')

    if (!token) {
        res.send({
            err_mess: mess_code.NOLOGIN,
            data: []
        })
        return
    }
    dbHandler.check_token(token, (err, result) =>  {
        const user = result[0]
        if (!user) {
            res.send(
                {
                    err_mess: mess_code.TOKEN_TIME_OUT,
                    data: []
                }
            )
            return
        }
        dbHandler.get_ds_tkb(user.id, (err , result) => {
            res.send({
                err_mess: null,
                data: result
            })
        })
    })

})

router.post('/tkb_save', function(req, res, next) {
    const token = req.session.token;
    const {name , id_to_hocs, thumbnail} = req.body;
    console.log(name, id_to_hocs)

    if (!token) {
        res.setHeader('Content-Type', 'application/json')
        res.send({
            err_mess: "token don't exit",
            data: null
        })
        return
    }

    if (!name || !id_to_hocs.length) {
        res.setHeader('Content-Type', 'application/json')
        res.status(400)
        res.send({
            err_mess: "bad req",
            data: null
        })

        return
    }

    dbHandler.check_token(token, (err, result) => {
        if (err) {

            return;
        }

        var user = result[0]
        if (!user) {
            res.setHeader('Content-Type', 'application/json')
            res.send({
                err_mess: "Login expired",
                data: null
            })
            return
        }

        const uuid = user.id;

        dbHandler.save_tkb(uuid, id_to_hocs, name, thumbnail , (err, result) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json')
            res.send({
                err_mess: null,
                data: null
            })
        })
        

    })
})



module.exports = router;