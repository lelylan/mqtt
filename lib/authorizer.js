var mongoose = require('mongoose')
  , debug    = require('debug')('lelylan')
  , Device   = require('../app/models/devices/device');

module.exports.authenticate = function(client, username, password, callback) {
  Device.findOne({ _id: username, secret: password }, function (err, doc) {
    console.log("Connecting")
    if (doc) client.device_id = doc.id
    callback(null, doc);
  });
}

module.exports.authorizePublish = function(client, topic, payload, callback) {
  debug('PUBLISH', client.device_id, topic, payload);
  callback(null, client.device_id == topic.split('/')[1]);
}

module.exports.authorizeSubscribe = function(client, topic, callback) {
  debug('SUBSCRIBE', client.device_id, topic);
  callback(null, client.device_id == topic.split('/')[1]);
}
