var mysql = require('mysql');


var options = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE_NAME
}
var con = mysql.createConnection(options);

con.connect(function(err) {
  if (err) throw err;
});



module.exports = con;