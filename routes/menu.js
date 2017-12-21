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

var table = {
  '21': 'tvboard',
  '31': 'mission1',
  '32': 'mission2',
  '51': 'notice',
  '52': 'freeboard'
}
var board = {
  '21': '신상 TV',
  '31': '해외 선교',
  '32': '국내 선교',
  '51': '공지사항',
  '52': '자유게시판'
}

//글보기
router.get('/:menu/:sub/:opt', function(req, res) {
  console.log("----get('/:menu/:sub/:opt'---------" + req.params.opt);
  var menu = req.params.menu;
  var sub = req.params.sub;
  var opt = req.params.opt;
  var num = menu + sub + '';

  if (opt == 'write') {
    res.render('template', { req: req, content: "menu/write", innerContent: "write", board: board[num]});
  } else if( /^\d+$/.test(opt)){  //opt가 숫자로만 이루어져 있을 때
    //해당 글 보기(opt==글번호)
    var sql = 'SELECT * FROM ?? WHERE id=?';
    var params = [ table[num], opt ];
    conn.query(sql, params,  function(err, rows) {
      if (err) {
        console.log('err: ' + err);
      } else {
        post = rows[0];
        console.log("----get('/:menu/:sub/:opt'------mysql---");
        res.render('template', { req: req, post: post, content: "menu/read", innerContent: "read" });
      }
    });
  } else {
    console.log("----get('/:menu/:sub/:opt'------redirect---");
    res.redirect('/menu/' + menu + '/' + sub);
  }
});

//글쓰기
router.post('/:menu/:sub/:opt', function(req, res) {
  console.log("----post('/:menu/:sub/:opt'----");

  var menu = req.params.menu;
  var sub = req.params.sub;
  var opt = req.params.opt;
  var num = menu + sub + '';

  var userid = req.user.userid; //로그인한 세션의 유저아이디
  var name = req.user.name;
  var title = req.body.title;
  var content = req.body.content;

  if (opt == 'write') {
    //글쓰기 DB작업
    var sql = 'INSERT INTO ?? (userid, name, title, content) VALUES(?, ?, ?, ?);';
    var params = [table[num], userid, name, title, content];
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
  console.log("-------get('/:menu/:sub'---------");
  var menuURL = 'menu/menu' + req.params.menu + '_sub' + req.params.sub;
  var index = req.params.menu + '/' + req.params.sub;
  var num = req.params.menu + req.params.sub + '';
  var posts = null;
  var isPrivate = false;
  if(table[num] == 'freeboard') isPrivate= true;

  if (num in table) {  //게시판 등 DB접속이 필요한 경우
    sql = 'SELECT * FROM ??';
    conn.query(sql, table[num], function(err, rows) {
      if (err) {
        console.log('err: ' + err);
      } else {
        posts = rows;
        res.render('template', { req: req, content: menuURL, innerContent: "list", posts: posts, index: index, isPrivate: isPrivate });
      }
    });
  } else {
    res.render('template', { req: req, content: menuURL, posts: posts });
  }
});

module.exports = router;
