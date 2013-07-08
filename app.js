var mongoose = require('mongoose')
  , mosca    = require('mosca')
  , debug    = require('debug')('lelylan');

var Device = require('./app/models/devices/device');

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

  server.authenticate = function(client, username, password, callback) {
    // TODO add the device id to the client so that we understand which devices can be recognized
    // TODO can we use the same channel

    debug('AUTHENTICATING', client.id, username, password);
    Device.findOne({ _id: username, secret: password }, function (err, doc) {
      callback(null, !!doc);
    });
  };

  server.authorizeSubscribe = function() {
    debug('AUTHORIZE SUBSCRIBE');
    callback(null, true);
  };

  server.authorizePublish = function() {
    debug('AUTHORIZE PUBLISH');
    callback(null, true);
  };
}

// MQTT server

var server = new mosca.Server(opts);
server.on('ready', setup);

module.exports = server;

