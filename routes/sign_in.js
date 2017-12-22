var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '하하호호',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());  //session 밑에 있어야 함

passport.serializeUser(function(user, done){
  console.log('serializeUser: ' + user);
  return done(null, user.userid);
});

passport.deserializeUser(function(id, done){
  console.log('deserializeUser: ' + id);
  var sql = 'SELECT * FROM users WHERE userid=?';
  conn.query(sql, id, function(err, rows){
    var user = rows[0];
    return done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField : 'userid',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done){
    var sql = 'SELECT * FROM users WHERE userid=?';
    conn.query(sql, username, function(err, rows){
      var user = rows[0];
      if(err){
        return done(err);
      }

      bcrypt.compare(password, user.password, function(err, res) {
          if (user && res) {  //아이디랑 비번이 모두 맞는 경우
            return done(null, user);
          }
          else {
            return done(null, false);
          }
      });

    });
  }
));

router.get('/', function(req, res, next) {
  res.render('template', { req: req, content: "sign_in", code: 200 });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failWithError: true,
    failureFlash: false
  }),
  function(err, req, res, next){
    res.render('template', { req: req, content: "sign_in", code: 401 });
  }
);

router.get('/logout', function(req, res){
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});


router.get('/find_userid', function(req, res){
  res.render('template', { req: req, content: "find_userid", name: "", userid: "", code: 200 });
});

router.post('/find_userid', function(req, res){
  var name = req.body.name;
  var phone = req.body.phone;

  var sql = 'SELECT userid FROM users WHERE (name=? AND phone=?);';
  var params = [name, phone];
  conn.query(sql, params, function(err, rows){
    if(err){
      console.log('err: ' + err);
    } else {
      if(rows.length > 0){
        res.render('template', { req: req, content: "find_userid", name: name, userid: rows[0].userid, code: 201});
      } else {
        res.render('template', { req: req, content: "find_userid", name: "", userid: "", code: 401});
      }
    }
  });
});

router.get('/find_password', function(req, res){
  res.render('template', { req: req, content: "find_password", code: 200});
});

router.post('/find_password', function(req, res){
  var userid = req.body.userid;
  var phone = req.body.phone;

  var sql = 'SELECT * FROM users WHERE (userid=? AND phone=?);';
  var params = [userid, phone];
  conn.query(sql, params, function(err, rows){
    var user = rows[0];
    if(err){
      console.log('err: ' + err);
    } else {
      console.log(rows);
      console.log(user);
      if(rows.length > 0){
        req.login(user, function(err){
          req.session.save(function(){
            res.redirect('/userinfo');
          });
        });
      } else {
        res.render('template', { req: req, content: "find_password", code: 401});
      }
    }
  });
});

module.exports = router;
