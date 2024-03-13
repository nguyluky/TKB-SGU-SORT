
var env = process.env;

var options = {
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASS,
    database: env.DB_DATABASE_NAME
}

module.exports = options
  