var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('newsFeed', {
    title: 'News Feed',
    contextTitle: 'Users'
  });
});

module.exports = router;
