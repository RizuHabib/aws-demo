var express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const con = mysql.createConnection({
    host: "database-instance-1.cbrcz04uccwb.us-east-1.rds.amazonaws.com",
    user: "nodedb",
    password: "qwertyuiop"
});

con.connect(function (err) {
    if (err) throw err;
    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS blockers(id int NOT NULL AUTO_INCREMENT, title varchar(30), startTime varchar(255), endTime varchar(255), description varchar(255), PRIMARY KEY(id));', function (error, result, fields) {
        console.log(result);
    });
});

var app = express();
app.use(cors());
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/public/home.html'));
});

app.get('/records', (req, res) => {
    res.render(path.join(__dirname + '/public/blockers.html'));
});


app.post('/blockers', (req, res) => {
    if (req.query.title && req.query.startTime && req.query.endTime && req.query.description) {
        console.log('Request received');
        con.connect(function (err) {
            con.query(`INSERT INTO main.blockers (title, startTime, endTime, description) VALUES ('${req.query.title}', '${req.query.startTime}', '${req.query.endTime}', '${req.query.description}')`, function (err, result, fields) {
                if (err) res.send(err);
                if (result) {

                    con.query(`SELECT * FROM main.blockers`, function (err, result, fields) {
                        if (err) res.send(err);
                        if (result) res.send(result);
                    });

                }
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.get('/blockers', function (req, res) {
    con.connect(function (err) {
        con.query(`SELECT * FROM main.blockers`, function (err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});
app.delete('/blockers', function (req, res) {
    con.connect(function (err) {
        con.query(`DELETE FROM main.blockers`, function (err, result, fields) {
            if (err) res.send(err);
            if (result) res.send('deleted successfully');
        });
    });
});


app.listen(3000, function () {
    console.log('app listening on port 3000!');
});



