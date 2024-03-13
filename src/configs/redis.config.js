const env = process.env;

const url = `redis://${env.REDIS_USER_NAME}:${env.REDIS_PASS}@${env.REDIS_HOST}:${env.REDIS_PORT}`
const config = {
    "url": url
}
module.exports = config