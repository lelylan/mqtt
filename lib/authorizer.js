var mongoose = require('mongoose')
  , debug    = require('debug')('lelylan')
  , Device   = require('../app/models/devices/device');


module.exports.authenticate = function(client, username, password, callback) {
  Device.findOne({ _id: username, secret: password }, function (err, doc) {
    if (doc) client.device_id = doc.id
    callback(null, doc);
  });
}

module.exports.authorizeSubscribe = function(client, topic, callback) {
  callback(null, client.device_id == topic.split('/')[1]);
}

module.exports.authorizePublish = function(client, topic, payload, callback) {
  callback(null, client.device_id == topic.split('/')[1]);
}
