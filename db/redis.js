
const RedisStore = require("connect-redis").default
const {createClient} = require('redis')


let redisClient = createClient({
    url: `redis://${process.env.REDIS_USER_NAME}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })


module.exports = {
    redisStore: redisStore,
    redisClient: redisClient
};