var express = require('express');
var router = express.Router();

router.get('/:menu/:index', function(req, res, next) {
  var menu = './menu/menu' + req.params.menu + '_sub' + req.params.index;
  res.render(menu, { req: req });
})

module.exports = router;
