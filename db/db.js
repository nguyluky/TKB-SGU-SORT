const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE_NAME
}

let con = mysql.createConnection(options);


con.connect((err, result) => {
  if (err) throw err;
})

module.exports = con;