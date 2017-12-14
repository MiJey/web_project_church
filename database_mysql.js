var mysql = require('mysql');
var conn = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'qwe123',
  database: 'church'
});
conn.connect();

var sql = 'SELECT * FROM users';
conn.query(sql, function(err, result){
  if(err){
    console.log(err);
  } else {
    console.log('result', result);
  }
});

conn.end();
