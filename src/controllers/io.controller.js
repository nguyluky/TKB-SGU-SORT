
const {Socket} = require("socket.io");
const mysqlService = require('../services/app.service')
const { checkPermissionTkb } = require('../middleware/app.middleware')

const Logger = require('../utils/logger')

/**
 * 
 * @param {Socket} socket 
 */
async function onConnect(socket) {
    
    const {tkb_id: tkbId} = socket.handshake.query;
    if (!tkbId) return
    const token = socket.request.session.token;
    const [err, userId] = await mysqlService.token2userId(token);
    if (err) {
        return
    }

    if (!userId) {
        return
    }

    if (!await checkPermissionTkb(tkbId, userId)) {
        return
    }

    Logger.info('>> %s join TKB %s', userId, tkbId)
    socket.join(tkbId)

    socket.on('add-hp', (mahp) => {
        socket.to(tkbId).emit("add-hp", mahp)
    })

    socket.on('remove-hp', (mahp) => {
        socket.to(tkbId).emit("remove-hp", mahp)
    })

    socket.on('change-th', (id_to_hoc) => {
        socket.to(tkbId).emit("change-th", id_to_hoc)
    })
  
    socket.on('disconnect', () => {
        Logger.info('>> %s lead TKB %s', userId, tkbId)
    });

  }

module.exports = onConnect