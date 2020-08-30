const mysql = require('mysql');

const con = mysql.createConnection({
    host     : "database-instance-1.cbrcz04uccwb.us-east-1.rds.amazonaws.com",
    user     : "nodedb",
    password : "qwertyuiop"
});

con.connect(function(err) {
    if (err) throw err;
    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS blockers(id int NOT NULL AUTO_INCREMENT, title varchar(30), startTime varchar(255), endTime varchar(255), description varchar(255), PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.end();
});