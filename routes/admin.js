var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('template', { req: req, content: "admin" });
});

module.exports = router;
