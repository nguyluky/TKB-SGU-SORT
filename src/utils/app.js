const crypto = require('crypto');

function token48(len = 36) {
  return new Promise(function (resolve, reject) {
    crypto.randomBytes(len, function (err, buffer) {
      var token = buffer.toString('hex').substring(0, len);
      resolve(token)
    });
  })
}


function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

module.exports = { token48, validateEmail }