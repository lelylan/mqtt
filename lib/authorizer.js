var mongoose = require('mongoose')
  , debug    = require('debug')('lelylan')
  , Device   = require('../app/models/devices/device');

module.exports.authenticate = function(client, username, password, callback) {
  Device.findOne({ _id: username, secret: password }, function (err, doc) {
    doc ? debug('Authorized connection for device', doc.id) : debug('Error connecting', username, password);

    if (doc) client.device_id = doc.id
    callback(null, doc);
  });
}

module.exports.authorizePublish = function(client, topic, payload, callback) {
  debug('AUTHORIZING SUBSCRIBE', client.device_id == topic.split('/')[1]);
  debug('PAYLOAD', payload.toString());
  debug('TOPIC', topic);
  callback(null, client.device_id == topic.split('/')[1]);
}

module.exports.authorizeSubscribe = function(client, topic, callback) {
  debug('AUTHORIZING PUBLISH', client.device_id == topic.split('/')[1]);
  debug('TOPIC', topic);
  callback(null, client.device_id == topic.split('/')[1]);
}
