var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('albumFeed', {
    title: 'Instagram',
    contextTitle: 'albumFeed'
  });
});

module.exports = router;
