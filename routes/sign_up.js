const express = require('express');
const dbHandler = require('../db/databaseHandle');
const sendMail = require('../email');
const crypto = require('crypto');
const { emitWarning } = require('process');

var router = express.Router();


const generateOTP = () => new Promise(res =>
	crypto.randomBytes(3, (err, buffer) => {
		res(
			parseInt(buffer.toString("hex"), 16)
				.toString()
				.substr(0, 5)
		);
	})
);

router.post('/otp' , function(req, res, next) {

    const otp = req.session.otp;
    const otp_r = req.body.otp;
    console.log("🚀 ~ router.post ~ otp_r:", otp_r)
    console.log("🚀 ~ router.post ~ otp:", otp)
    
    // NOTE: CHECK OTP
    if (otp_r !== otp) {
        res.status(300).send('Otp không đúng')
        return
    }

    const {user, password, email, display_name, ma_sv, khoa, lop} = req.session.user_info;

    dbHandler.sign_up(user, password, email, display_name, ma_sv, khoa, lop, function(err,result) {
        if (err) {
            var mess;
            console.log(err)
            if (err.code == "ER_DUP_ENTRY") mess = "Tên đăng nhập đã tồn tại"
            else mess = err.code;
            res.status(300).send(mess);
            return;
        };
        console.log(result)
        res.status(200).send('ok');
    });
})


router.post('/checkacc', function(req, res, next) {
    var {user_name} = req.body;
    console.log(user_name)
    dbHandler.check_have_acc(user_name, (err, result) => {
        console.log(result[0]['COUNT(*)'])
        if (result[0]['COUNT(*)'] == 0) {
            res.status(200).send()

            return
        }

        res.status(300).send()

    })
})

router.post('/checkemail', function(req, res, next) {
    var {email} = req.body;
    
})

// create acc
router.put('/', async function(req, res, next) {
    const otp_g = await generateOTP();
    req.session.user_info = req.body;
    req.session.otp = otp_g;
    console.log(otp_g)
    res.status(200).send()
})

// update info
router.post('/', function(req, res, next) {
    dbHandler.update_info({
        uuid: req.session.uuid,
        ...req.body
    }, (err, result) => {
        res.send(err)
    })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("sign_up", {});
});

module.exports = router;