
const RedisStore = require("connect-redis").default
const {createClient} = require('redis')

const config = require('../configs/redis.config')

const redisClient = createClient(config)

console.log('>> start connet redis', config.url)

redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })

function cache(func) {
async function defined(params) {
    const key = func.name ? 'cache:' + func.name : (func_count++, 'cache:func_' + func_count)

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

module.exports = {
    redisStore,
    redisClient,
    cache
};