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


// TODO add the device id to the client so that we understand which devices can be recognized
// TODO can we use the same channel
// TODO should be /device/id or device/id as topic?
// TODO check also the payload for the
// TODO how can i save the device id in the client object?
// TODO see if you can remove the !! from authorize

// Authorization
var setup = function() {
  server.authenticate = function(client, username, password, callback) {
    debug('AUTHENTICATING', client.id, username, password);
    Device.findOne({ _id: username, secret: password }, function (err, doc) {
      callback(null, !!doc);
    });
  };

  server.authorizeSubscribe = function(client, topic, payload, callback) {
    debug('AUTHORIZING SUBSCRIPTION', client, topic, payload);
    callback(null, true);
  };

  server.authorizePublish = function(client, topic, payload, callback) {
    var device_id = topic.split('/')[1]
    debug('AUTHORIZING PUBLISHING', client.id, payload, topic, device_id);
    callback(null, true);
  };
}

// MQTT server

var server = new mosca.Server(opts);
server.on('ready', setup);

module.exports = server;

