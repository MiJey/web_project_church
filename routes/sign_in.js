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
  console.log('serializeUser: ' + user);
  return done(null, user.userid);
});

passport.deserializeUser(function(id, done){
  console.log('deserializeUser: ' + id);
  var sql = 'SELECT * FROM users WHERE userid=?';
  conn.query(sql, id, function(err, rows){
    return done(err, rows[0]);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField : 'username',
    passwordField : 'password',
     passReqToCallback : true
  }, function(req, username, password, done){
    console.log('hello: ' + username + ", " + password);
    var sql = 'SELECT * FROM users WHERE userid=?';
    conn.query(sql, username, function(err, rows){
      var user = rows[0];
      if(err){
        return done(err);
      }
      if(!user || user.password != password){
        console.log('아이디 비번 틀림~~');
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

router.get('/', function(req, res, next) {
  res.render('sign_in', { messages: req.flash('info') });
});

router.get('/login', function(req, res){

});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failWithError: true,
    failureFlash: false
  }),
  function(err, req, res, next){
    res.render('sign_in', { code: 401 });
  }
);

module.exports = router;
