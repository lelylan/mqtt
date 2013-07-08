var async = require('async')
  , mqtt = require('mqtt')
  , ascoltatori = require('ascoltatori')
  , chai = require('chai')
  , expect = require('chai').expect
  , sinon = require('sinon')
  , debug = require('debug')('test');

chai.use(require('sinon-chai'));
chai.use(require('chai-fuzzy'));

var instance
  , secondInstance;

var ascoltatore = {
      type: 'mongo',
      uri: process.env.MONGOLAB_JOBS_HOST,
      db: process.env.MONGOLAB_JOBS_DB,
      pubsubCollection: 'mqtt',
      mongo: {} }
  , settings = {
      port: process.env.PORT || 11884,
      backend: ascoltatore };

describe('MQTT server',function() {

  // client options
  function buildOpts() {
    return {
      keepalive: 1000,
      clientId: 'mosca_' + require('crypto').randomBytes(16).toString('hex'),
      protocolId: 'MQIsdp',
      protocolVersion: 3
    };
  }

  // mqtt server
  beforeEach(function(done) {
    instance = require('../app')
    instance.on('ready', function() {
      console.log('MQTT server ready');
      done();
    })
  });

  // close all mqtt servers after the spec execution
  afterEach(function(done) {
    var instances = [instance];

    if (secondInstance) { instances = [secondInstance].concat(instances) }

    async.parallel(instances.map(function(i) {
      return function(cb) {
        i.close(cb);
      };
    }), function() {
      done();
    });
  });

  function buildClient(done, callback) {
    var client = mqtt.createConnection(settings.port, settings.host);

    client.once('error', done);
    client.stream.once('close', function() {
      console.log('CLOSE')
      done()
    });
    client.on('connected', function() {
      console.log('CONNECTED');
      callback(client)
    });
  }

  it('should support connecting and disconnecting', function(done) {
    buildClient(done, function(client) {
      client.connect(buildOpts());

      client.on('connack', function(packet) {
        console.log('CONNACK')
        client.disconnect();
      });
    });
  });
});
