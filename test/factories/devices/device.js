var Factory = require('factory-lady')
  , Device  = require('../../../app/models/devices/device')

Factory.define('device', Device, {
  secret: 'device-secret'
});
