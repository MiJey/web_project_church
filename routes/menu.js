var express = require('express');
var router = express.Router();

router.get('/:menu/:index', function(req, res, next) {
  res.render('./menu/menu' + req.params.menu + '_sub' + req.params.index);
})

module.exports = router;
