var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var router = express.Router();
var app = express();
var conn = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'qwe123',
  database: 'church'
});
conn.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  sql = 'SELECT * FROM users WHERE level=0;';
  conn.query(sql, function(err, rows){
    if(err){
      console.log('err: ' + err);
    } else {
      res.render('template', { req: req, content: "admin", users: rows });
    }
  });
});

router.post('/approval', function(req, res){
  var users = req.body.users;
  var sql = 'UPDATE users SET level = 1 WHERE userid IN (';

  for(var i = 0; i < users.length; i++){
    sql += "'" + users[i] + "'";
    if(i != users.length - 1){
      sql += ', ';
    }
  }
  sql += ')';

  conn.query(sql, function(err, rows){
    if(err){
      console.log('err: ' + err);
    } else {
      res.redirect('/admin');
    }
  });
});

module.exports = router;
