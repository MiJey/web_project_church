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
  res.render('sign_up', { req: req });
});

router.post('/register', function(req, res){
  var userid = req.body.userid;
  var password = req.body.password;
  var name = req.body.name;
  var birth = req.body.year + req.body.month + req.body.date;
  var phone = req.body.fst_ph + req.body.mid_ph + req.body.last_ph;
  var email = req.body.email;

  //회원가입
  var sql = 'INSERT INTO users (userid, password, name, birth, phone, email) VALUES(?, ?, ?, ?, ?, ?);';
  var params = [ userid, password, name, birth, phone, email ];
  conn.query(sql, params, function(err, rows){
    if(err){
      console.log('err: ' + err);
      res.redirect('/sign_up');
    }
  });

  //회원가입 후 바로 로그인, 웰컴페이지로 이동
  sql = 'SELECT * FROM users WHERE userid=?'
  conn.query(sql, userid, function(err, result){
    var user = result[0];
    if(err){
      console.log('err: ' + err);
    } else {
      console.log(user);
      req.login(user, function(err){
        req.session.save(function(){
          res.redirect('/sign_up/welcome');
        });
      });
    }
  });


});

router.get('/welcome', function(req, res){
  console.log('req: '+req.user);
  res.render('welcome', { req: req });
});

module.exports = router;
