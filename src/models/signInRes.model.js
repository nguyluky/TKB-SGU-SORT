

/**
 * 
 * @param {response} res 
 * @param {boolean} success 
 * @param {string} mess 
 * @param {*} data 
 * @returns 
 */
function createResponse(res , success, mess) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
        "success": success,
        "mess": mess
    }))
}

module.exports = createResponse