var mosca = require('mosca')
  , authorizer = require('./authorizer')
  , debug = require('debug')('lelylan');

var server
  , ascoltatore = {
      type: 'mongo',
      uri: process.env.MONGOLAB_JOBS_HOST,
      db: process.env.MONGOLAB_JOBS_DB,
      pubsubCollection: 'mqtt',
      mongo: {} }
  , opts = {
      port: process.env.PORT || 1883,
      backend: ascoltatore };


function app(port) {
  if (port) opts.port = port

  var server = new mosca.Server(opts);
  server.on('ready', setup);

  function setup() {
    server.authenticate = authorizer.authenticate;
    server.authorizePublish = authorizer.authorizePublish;
    server.authorizeSubscribe = authorizer.authorizePublish;
  }

  return server
}

module.exports.start = app;
