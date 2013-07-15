var mosca = require('mosca')
  , authorizer = require('./authorizer')
  , debug = require('debug')('lelylan');

function app(settings) {

  var server = new mosca.Server(settings);
  server.on('ready', setup);

  function setup() {
    server.authenticate = authorizer.authenticate;
    server.authorizePublish = authorizer.authorizePublish;
    server.authorizeSubscribe = authorizer.authorizeSubscribe;
  }

  server.on('published', function(packet, client) {
    debug('Published', packet.payload);
  });

  return server
}

module.exports.start = app;
