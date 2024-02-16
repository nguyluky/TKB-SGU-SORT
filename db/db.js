var mysql = require('mysql');


var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE_NAME
}
var con = mysql.createConnection(options);



function create_database_table() {
  var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
  }

  var con1 = mysql.createConnection(options)

  con1.connect(function (err) {
    
  })

}

con.connect(function (err) {
  if (err) {
    // tạo database and table

  };
});



module.exports = con;