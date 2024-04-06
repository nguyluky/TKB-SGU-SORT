const nodemailer = require('nodemailer');
const Logger = require('../utils/logger');
const logger = require('../utils/logger');

const login_option = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS
    }
}
var transporter = nodemailer.createTransport(login_option)

function sendMail(to, subject, text, callback) {
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        text: text
    }
    logger.debug('>> send email frome %s to %s', process.env.EMAIL_USERNAME, to);
    transporter.sendMail(mainOptions, callback);
}

function sendOtp(to, otp, userName, callback) {
    const subject = `Xác thực OTP: ${otp}\n`
    var text = `Xin chào ${userName},\n`+
    "Cảm ơn bạn đã đăng ký tài khoản.\n"+
    "Để hoàn tất quá trình đăng ký, bạn cần xác thực email của mình bằng mã OTP được gửi trong email này.\n"+
    `Mã OTP của bạn là: ${otp}\n`+
    "Vui lòng nhập mã OTP vào trang web tkbsgusort.id.vn trong vòng 5 phút."

    sendMail(to, subject, text, callback)
}

module.exports = {
    sendMail, sendOtp
}