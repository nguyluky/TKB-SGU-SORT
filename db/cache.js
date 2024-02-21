const {redisClient} = require('./redis');

var func_count = 0;

module.exports = function(func) {
    async function defined(params) {
        const key = func.name ? func.name : (func_count++, 'func_' + func_count)

        const cache_result = await redisClient.get(key)

        if (cache_result) {
            console.log('read cache')
            return cache_result
        }

        const result = func(...arguments)
        await redisClient.set(key, result)

        return result
    }

    return defined
}