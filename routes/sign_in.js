var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());  //session 밑에 있어야 함

passport.serializeUser(function(user, done){
  return done(null, user.userid);
});

passport.deserializeUser(function(id, done){
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
      if(!user || user.password != password){ //아이디 비번 틀림
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

router.get('/', function(req, res, next) {
  res.render('sign_in', { req: req, code: 200 });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failWithError: true,
    failureFlash: false
  }),
  function(err, req, res, next){
    res.render('sign_in', { req: req, code: 401 });
  }
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
