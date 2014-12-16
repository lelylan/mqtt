var mosca = require('mosca')
  , authorizer = require('./authorizer')
  , debug = require('debug')('lelylan');

function app(settings) {

  var server = new mosca.Server(settings, done);
  function done() {}

  server.on('ready', setup);

  function setup() {
    server.authenticate       = authorizer.authenticate;
    server.authorizePublish   = authorizer.authorizePublish;
    server.authorizeSubscribe = authorizer.authorizeSubscribe;
  }

  //server.on('published', function(packet, client) {
    //if (packet.topic.indexOf('$SYS') === 0) return; // doesn't print stats info
    //debug('Published', packet.payload.toString(), 'on topic', packet.topic);
  //});

  return server
}

module.exports.start = app;
