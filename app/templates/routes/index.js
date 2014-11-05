var express = require('express');
var stormpath = require('express-stormpath');

var router = express.Router();

router.get('/', function(req, res) {
  if (req.user) {
    res.send('You are logged in! Click <a href="/logout">here</a> to logout.');
  } else {
    res.send('Welcome to your Express + Stormpath app! Visit the <a href="/register">registration</a> or <a href="/login">login</a> pages to continue.');
  }
});

module.exports = router;
