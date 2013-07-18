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

  if (process.getuid() === 0)
    require('fs').stat(__filename, function(err, stats) {
      if (err) return console.log(err)
      process.setuid(stats.uid);
    });
});
