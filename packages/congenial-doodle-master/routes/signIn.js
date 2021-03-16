var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signIn', {
    title: 'Login',
    contextTitle: 'login to know more'
  });
});


router.post('/', function (req, res, next) {
  let options = {
    maxAage: 3600, // 60*60 seconds i.e. for an hour
    httpOnly: true, // the cookie will only be accessible by the server
    signed: true, // indicates if the cookie should be signed
    // following are garbage
    // secret: 'victoria\'s', // signed cookies need a secret
    // credentials: 'include', // this is said to be important
  };
  
  if (req.body.rememberMe) {
    options.maxAge = 31536000; // 60*60*24*365 seconds i.e. for a year
  }
  var template = `
    success 
    ${req.body.uname} 
    you are now logged in
  `;
  res.cookie('token', 'logintoken expires in', options);
  res.send(template);
});

module.exports = router;