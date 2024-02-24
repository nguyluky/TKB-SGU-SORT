const nodemailer = require('nodemailer');


const login_option = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS
    }
}
console.log(login_option)
var transporter = nodemailer.createTransport(login_option)


module.exports = function(otp, to, callback) {
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: 'oth Auth ' + otp,
        text: 'otp Auth ' + otp,
    }

    transporter.sendMail(mainOptions, callback);
}