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

//opt는 글보기, 글쓰기, 글수정 등 해당 게시판의 옵션메뉴
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

router.get('/:menu/:sub', function(req, res) {
  var menuURL = 'menu/menu' + req.params.menu + '_sub' + req.params.sub;
  var posts = null;
  var table = null;

  if (req.params.menu == 5 && req.params.sub == 2)
    table = 'freeboard'; //자유게시판

  if (table != null) {
    sql = 'SELECT * FROM ??';
    conn.query(sql, table, function(err, rows) {
      if (err) {
        console.log('err: ' + err);
      } else {
        posts = rows;
        res.render(menuURL, { req: req, posts: posts });
      }
    });
  } else {
    res.render(menuURL, { req: req, posts: posts });
  }
});

module.exports = router;
