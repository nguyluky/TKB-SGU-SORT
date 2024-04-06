const request = require('request');

function getUserToken(username, password) {   
    return new Promise((resolve, reject) => {
        request.post(
            "https://thongtindaotao.sgu.edu.vn/api/auth/login", 
            {
                body: `username=${username}&password=${password}&grant_type=password`,
                headers: {
                    "content-type": "text/plain"
                }
            },
            function (err, resp, body) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(body);
            }
        )
    })
}


async function getUserInfo(access_token) {
    return new Promise((resolve, reject) => {
        request.post("https://thongtindaotao.sgu.edu.vn/api/dkmh/w-locsinhvieninfo",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            },
            function (err, resp, body) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(body);
            }
        )
    })
}
module.exports = {
    getUserToken, getUserInfo
}

