var express = require('express');
var stormpath = require('express-stormpath');

var routes = require('./routes/index.js');

var app = express();
app.use(stormpath.init(app, {
  apiKeyId:     process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  application:  process.env.STORMPATH_URL || process.env.STORMPATH_APPLICATION,
  secretKey:    process.env.STORMPATH_SECRET_KEY,
}));
app.use('/', routes);

app.listen(process.env.PORT || '3000');
