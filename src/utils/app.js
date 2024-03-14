const crypto = require('crypto');

function token48(len = 36) {
        return new Promise(function(resolve, reject) {
            crypto.randomBytes(len, function(err, buffer) {
                var token = buffer.toString('hex').substring(0, len);
                resolve(token)
              });
        })
}

module.exports = {token48}