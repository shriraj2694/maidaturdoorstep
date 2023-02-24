var mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "userdb",
  password: "maidaturdoorstep",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});