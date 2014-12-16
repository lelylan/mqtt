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
  debug('Authorizing publish  ', client.device_id == topic.split('/')[1], topic, payload.toString());
  callback(null, client.device_id == topic.split('/')[1]);
}

module.exports.authorizeSubscribe = function(client, topic, callback) {
  debug('Authorizing subscribe', client.device_id == topic.split('/')[1], topic);
  callback(null, client.device_id == topic.split('/')[1]);
}
