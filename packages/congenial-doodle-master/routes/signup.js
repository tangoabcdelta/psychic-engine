var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup', {
    title: 'Sign Up',
    contextTitle: 'Sign Up'
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body.fname);
  console.log(req.body.lname);
  console.log(req.body.gender);
  
  var template = `
    Hello 
    ${req.body.fname} 
    ${req.body.lname} 
    ${req.body.gender} `;
  res.send(template);
});

module.exports = router;
