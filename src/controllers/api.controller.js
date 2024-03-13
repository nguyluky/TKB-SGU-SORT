const { request, response } = require('express');

const mysqlService = require('../services/app.service')
const { createResponse, errCode } = require('../models/apiRes.model')
const {cache} = require('../services/redis.service');
const { checkEmailAlreadyExists: checkEmailAE, checkUserNameAlreadyExists: checkUserNameAE, checkPermissionTkb } = require('../middleware/app.middleware')


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getDsHocPhan(req, res) {
    res.setHeader('Content-Type', 'application/json')

    function read_file() {
        return fs.readFileSync(path.join(cachePath , 'locdsnhomto.json'), 'utf-8')
    }

    json_file = await cache(read_file)()
    res.send(json_file)
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getUserInfo(req, res) {
    const token = req.session.token;

    if (!token) {
        createResponse(res, errCode.NOLOGIN, null);
        return;
    }


    var [err, userId] = await mysqlService.token2userId(token);
    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR)
        return;
    }

    if (!userId) {
        createResponse(res, errCode.TOKEN_TIME_OUT, null);
        return;
    }

    [err, userInfo] = await mysqlService.findUserById(userId);

    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR)
        return;
    }

    createResponse(res, null, userInfo);

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getDsKhoa(req, res) {
    const [err, dsKhoa] = await mysqlService.getDsKhoa();

    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR)
        return;
    }

    createResponse(res, null, dsKhoa);
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getDsLop(req, res) {
    const [err, dsLop] = await mysqlService.getDsLop();
    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR)
        return;
    }

    createResponse(res, null, dsLop);
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function checkEmailAlreadyExists(req, res) {
    // TODO: rework this fs
    const { email }= req.body;
    if (await checkEmailAE(email)) {
        createResponse(res, null, true)
        return
    }

    createResponse(res, null, false)
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function checkUserNameAlreadyExists(req, res) {
    var {user_name: userName} = req.body;

    if (await checkUserNameAE(userName)) {
        createResponse(res, null, true);
    }

    createResponse(res, null, false);
    // const [err, user] = await mysqlService.findUserByUserName(userName)
    // if (err) {
    //     console.error(err)
    //     createResponse(res, errCode.SERVER_ERR);
    //     return
    // }

    // if (user) {
    //     createResponse(res, null, true);
    //     return
    // }

    // createResponse(res, null, false);


}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getDsTkb(req, res) {
    const token = req.session.token;

    const [err, userId] = await mysqlService.token2userId(token);
    if (err || !userId) {
        createResponse(res, errCode.NOLOGIN, []);
        return
    }

    
    const [err1, dsTkb] = await mysqlService.getDsTkb(userId);

    if (err1) {
        console.log(err1);
        createResponse(res, errCode.SERVER_ERR);
        return;
    }

    createResponse(res, null, dsTkb);
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function createTkb(req, res) {
    const token = req.session.token;

    const [err, userId] = await mysqlService.token2userId(token);

    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR);
        return
    }

    if (!userId) {
        createResponse(res, errCode.NOLOGIN);
        return
    }  

    const {name , id_to_hocs: idToHocs, description,thumbnail} = req.body;

    if (!name || !idToHocs) {
        createResponse(res, errCode.BAD_REQ);
        return;
    }


    const [err1, tkbId] = await mysqlService.saveTkb(userId, idToHocs, name, description, thumbnail);

    if (err1) {
        console.error(err1);
        createResponse(res, errCode.SERVER_ERR);
        return;
    }

    createResponse(res, null, {
        "tkb_id": tkbId
    })

}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function updateTkb(req, res) {

    const token = req.session.token;

    const [err, userId] = await mysqlService.token2userId(token);
    
    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR);
        return;
    }

    if (!userId) {
        createResponse(res, errCode.NOLOGIN);
        return;
    }

    const { tkb_id: tkbId} = req.query;

    if (!checkPermissionTkb(tkbId, userId)) {
        createResponse(res, errCode.PERMISSION)
    }

    const {name , id_to_hocs: idToHocs, description,thumbnail} = req.body;

    const [err1, result] = mysqlService.updateTkb(tkbId, idToHocs, name, description, thumbnail, userId);

    if (err1) {
        console.error(err1)
        createResponse(res, errCode.SERVER_ERR);
        return;
    }

    createResponse(res, null, "ok");
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
async function getTkb(req, res) {
    const token = req.session.token;

    const [err, userId] = await mysqlService.token2userId(token);
    
    if (err) {
        console.error(err);
        createResponse(res, errCode.SERVER_ERR);
        return;
    }

    if (!userId) {
        createResponse(res, errCode.NOLOGIN);
        return;
    }

    const { tkb_id: tkbId} = req.query;

    if (!checkPermissionTkb(tkbId, userId)) {
        createResponse(res, errCode.PERMISSION)
    }

    const [err1, tkb] = await mysqlService.getTkb(tkbId);
    if (err1) {
        console.error(err1)
        createResponse(res, errCode.SERVER_ERR)
        return
    }

    tkb.id_user = ""

    createResponse(res, null, tkb);
}


module.exports = {
    getDsHocPhan,
    getUserInfo,
    getDsKhoa,
    getDsLop,
    checkEmailAlreadyExists,
    getDsTkb,
    createTkb,
    updateTkb,
    getTkb,
    checkUserNameAlreadyExists
}
