
const RedisStore = require("connect-redis").default
const {createClient} = require('redis')
const Logger = require('../utils/logger')
const config = require('../configs/redis.config')
const logger = require("../utils/logger")

const redisClient = createClient(config)

Logger.info('>> start connet redis %s', config.url)

redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })

async function cache(func) {
    const key = func.name ? 'cache:' + func.name : (func_count++, 'cache:func_' + func_count)

    const cache_result = await redisClient.get(key)


    if (cache_result) {
        logger.info('>> get cache id %s', key)
        return cache_result
    }

    const result = func(...arguments)
    await redisClient.set(key, result)
    logger.info('>> cache add function id %s' , key)

    return result
}

module.exports = {
    redisStore,
    redisClient,
    cache
};