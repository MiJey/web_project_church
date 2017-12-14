var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('sign_up');
});

router.get('/test', function(req, res, next){
  res.send("하하호호");
});

module.exports = router;
