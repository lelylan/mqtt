var server = require('./lib/server')
  , debug  = require('debug')('lelylan');

var app = new server.start();
console.log(app);
module.exports = app
