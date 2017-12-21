var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var router = express.Router();
var app = express();
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwe123',
  database: 'church'
});
conn.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//글보기
router.get('/:menu/:sub/:opt', function(req, res) {
  var menu = req.params.menu;
  var sub = req.params.sub;
  var opt = req.params.opt;

  if (opt == 'post') {
    res.render('menu/post', { req: req });
  } else if( typeof(parseInt(opt)) == 'number'){
    //해당 글 보기(opt==글번호)
    var sql = 'SELECT * FROM ?? WHERE id=?';
    var table = null;
    if( menu == 5 && sub == 2 ) table = 'freeboard';
    var params = [ table, opt ];
    conn.query(sql, params,  function(err, rows) {
      if (err) {
        console.log('err: ' + err);
      } else {
        post = rows[0];
        res.render('menu/viewpost', { req: req, post: post });
      }
    });
  } else {
    res.redirect('/menu/' + menu + '/' + sub);
  }
});

//글쓰기
router.post('/:menu/:sub/:opt', function(req, res) {
  var menu = req.params.menu;
  var sub = req.params.sub;
  var opt = req.params.opt;

  var userid = req.user.userid; //로그인한 세션의 유저아이디
  var name = req.user.name;
  var title = req.body.title;
  var content = req.body.content;

  if (opt == 'write') {
    //글쓰기 DB작업
    var sql = 'INSERT INTO ?? (userid, name, title, content) VALUES(?, ?, ?, ?);';
    var table = null;
    if (menu == 5 && sub == 2) table = 'freeboard';
    var params = [table, userid, name, title, content];
    conn.query(sql, params, function(err, rows) {
      if (err) {
        console.log('err: ' + err);
      } else {
        res.redirect('/menu/' + menu + '/' + sub);
      }
    });
  }
});

//메뉴
router.get('/:menu/:sub', function(req, res) {
  var menuURL = 'menu/menu' + req.params.menu + '_sub' + req.params.sub;
  var posts = null;
  var table = null;

  if (req.params.menu == 5 && req.params.sub == 2)
    table = 'freeboard'; //자유게시판

  if (table != null) {  //게시판 등 DB접속이 필요한 경우
    sql = 'SELECT * FROM ??';
    conn.query(sql, table, function(err, rows) {
      if (err) {
        console.log('err: ' + err);
      } else {
        posts = rows;
        res.render('template', { req: req, content: menuURL, posts: posts });
      }
    });
  } else {
    res.render('template', { req: req, content: menuURL, posts: posts });
  }
});

module.exports = router;
