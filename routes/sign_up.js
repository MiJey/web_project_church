var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('sign_up', { req: req });
});

module.exports = router;
