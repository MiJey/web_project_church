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
  res.render('template', { req: req, content: "sign_up"});
});

//회원가입
router.post('/register', function(req, res){
  var userid = req.body.userid;
  var password = req.body.password;
  var name = req.body.name;
  var birth = req.body.birth;
  var phone = req.body.phone;
  var email = req.body.email;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  var sql = 'SELECT * FROM users WHERE userid=?';
  conn.query(sql, userid, function(err, rows){
    if(err){
      console.log('err: ' + err);
      res.redirect('/sign_up');
    }
    if(rows.length > 0){
      //아이디 중복
      res.redirect('/sign_up');
    } else {
      //회원정보 DB저장
      sql = 'INSERT INTO users (userid, password, name, birth, phone, email) VALUES(?, ?, ?, ?, ?, ?);';
      bcrypt.hash(password, null, null, function(err, hash) {
        var params = [ userid, hash, name, birth, phone, email ];

        conn.query(sql, params, function(err, rows){
          if(err){
            console.log('err: ' + err);
            res.redirect('/sign_up');
          } else {
            //회원가입 후 바로 로그인, 웰컴페이지로 이동
            sql = 'SELECT * FROM users WHERE userid=?';
            conn.query(sql, userid, function(err, result){
              var user = result[0];
              if(err){
                console.log('err: ' + err);
              } else {
                req.login(user, function(err){
                  req.session.save(function(){
                    res.redirect('/sign_up/welcome');
                  });
                });
              }
            });
          }
        });
      });

    }
  });

});

router.get('/welcome', function(req, res){
  res.render('template', { req: req, content: "welcome" });
});

module.exports = router;
