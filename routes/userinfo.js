var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

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
  var userid = req.user.userid;
  var sql = 'SELECT * FROM users WHERE userid=?';

  conn.query(sql, userid, function(err, rows){
    if(err){
      console.log('err: ' + err);
    } else {
      res.render('template', { req: req, user: rows[0], content: "userinfo"});
    }
  });
});

router.post('/update', function(req, res){
  var id = req.user.id;
  var newPassword = req.body.password;
  var sql = 'UPDATE users SET password=? WHERE id=?';

  bcrypt.hash(password, null, null, function(err, hash) {
    var params = [ hash, id ];
    conn.query(sql, params, function(err, rows){
      if(err){
        console.log('err: ' + err);
      } else {
        res.redirect('/userinfo');
      }
    });
  });

});
module.exports = router;
