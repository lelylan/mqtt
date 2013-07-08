// TODO can we use the same channel to set and read?
// TODO should be /device/id or device/id as topic?
// TODO check also the payload for testing

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
  server.authenticate = function(client, username, password, callback) {
    debug('Authenticating', client.id, username, password);
    Device.findOne({ _id: username, secret: password }, function (err, doc) {
      if (doc) client.device_id = doc.id
      callback(null, doc);
    });
  };

  server.authorizePublish = function(client, topic, payload, callback) {
    debug('Authorizing publishing', client.id);
    callback(null, client.device_id == topic.split('/')[1]);
  };

  server.authorizeSubscribe = function(client, topic, callback) {
    debug('Authorizing subscriptions', client.id);
    callback(null, client.device_id == topic.split('/')[1]);
  };
}

// MQTT server

var server = new mosca.Server(opts);
server.on('ready', setup);

module.exports = server;

