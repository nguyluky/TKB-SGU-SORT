const crypto = require('crypto');

function token48() {
        return new Promise(function(resolve, reject) {
            crypto.randomBytes(48, function(err, buffer) {
                var token = buffer.toString('hex').substring(0, 36);
                resolve(token)
              });
        })
}

module.exports = {token48}