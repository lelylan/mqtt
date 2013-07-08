var mongoose = require('mongoose')
  , mosca    = require('mosca')
  , debug    = require('debug')('lelylan');

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



// Authorization

var setup = function() {
  debug("SETTING UP AUTHORIZATION");

  //server.authenticate       = function() { debug('AUTHENTICATING'); return true };
  //server.authorizeSubscribe = function() { debug('AUTHORIZE SUBSCRIBE'); return true };
  //server.authorizePublish   = function() { debug('AUTHORIZE PUBLISH'); return true };
}

// MQTT server initialization

var server = new mosca.Server(opts);
server.on('ready', setup);

module.exports = server;

