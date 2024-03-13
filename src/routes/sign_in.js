const express = require('express');

const signInController = require('../controllers/sign_in.controller')

var router = express.Router();



router.get('/log_out' , signInController.lignOut);

// router.get('/checkLogin', function(req, res, next) {
//     var token = req.session.token;
//     // console.log("🚀 ~ router.get ~ token:", token)
//     // console.log("🚀 ~ dbHandler.create_token ~ req.session.id:", req.session.id)

//     if (!token) {        
//         res.status(300).send();
//         return
//     }

//     dbHandler.check_token(token, (err, result) => {
//         if (err) throw err;
//         var uuid = result[0];
//         if (!uuid) {
//             res.status(300).send();
//             return;
//         }
//         res.status(200).send();
//     });
// })


router.post('/', signInController.login)

/* GET home page. */
router.get('/', signInController.getLoginPage);

module.exports = router;