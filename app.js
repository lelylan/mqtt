var server = require('./lib/server')
  , debug  = require('debug')('lelylan');

var ascoltatore = {
      type: 'redis',
      redis: require('redis'),
      db: 12,
      port: 6379,
      return_buffers: true,
      host: process.env.REDIS_HOST }
  , settings = {
      port: process.env.NODE_PORT || 1883,
      backend: ascoltatore };

var app = new server.start(settings);

app.on('published', function(packet, client) {
  if (packet.topic.indexOf('$SYS') === 0) return; // doesn't print stats info
    debug('ON PUBLISHED', packet.payload.toString(), 'on topic', packet.topic);
});

app.on('ready', function() {
  debug('MQTT Server listening on port', process.env.NODE_PORT)
});
