var server = require('./lib/server')
  , debug  = require('debug')('lelylan');

var ascoltatore = {
      type: 'mongo',
      uri: process.env.MONGOLAB_JOBS_HOST,
      db: process.env.MONGOLAB_JOBS_DB,
      pubsubCollection: 'mqtt',
      mongo: {} }
  , settings = {
      port: process.env.NODE_PORT || 1883,
      backend: ascoltatore };

var app = new server.start(settings);

app.on('ready', function() {
  debug('MQTT Server listening on port', process.env.NODE_PORT)
});

