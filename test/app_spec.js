// TODO refactoring

var async = require('async')
  , mqtt = require('mqtt')
  , ascoltatori = require('ascoltatori')
  , chai = require('chai')
  , expect = require('chai').expect
  , sinon = require('sinon')
  , debug = require('debug')('test');

chai.use(require('sinon-chai'));
chai.use(require('chai-fuzzy'));

var Factory = require('factory-lady')
  , Device = require('../app/models/devices/device');

require('./factories/devices/device');



describe('MQTT client',function() {

  var instance
    , device
    , ascoltatore = {
        type: 'mongo',
        uri: process.env.MONGOLAB_JOBS_HOST,
        db: process.env.MONGOLAB_JOBS_DB,
        pubsubCollection: 'mqtt',
        mongo: {} }
    , settings = {
        port: process.env.PORT || 11884,
        backend: ascoltatore }
    , opts = {
        keepalive: 1000,
        clientId: 'mosca_' + require('crypto').randomBytes(16).toString('hex'),
        protocolId: 'MQIsdp',
        protocolVersion: 3 };

  beforeEach(function(done) {
    instance = require('../app')
    instance.on('ready', done)
  });

  beforeEach(function(done) {
    Factory.create('device', {}, function(doc) {
      device = doc;
      done();
    });
  });

  afterEach(function(done) {
    var instances = [instance];

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
    client.on('connected', function() { callback(client) });
    client.stream.once('close', function() { done() });
  }

  function buildAndConnect(done, callback) {
    buildClient(done, function(client) {
      client.connect(opts);
      client.on('connack', function(packet) { callback(client) });
    });
  }

  describe('with valid client ID and secret', function() {

    beforeEach(function() {
      opts.username = device.id;
      opts.password = device.secret;
    });

    it('connects', function(done) {
      buildClient(done, function(client) {
        client.connect(opts);

        client.on('connack', function(packet) {
          expect(packet.returnCode).to.eql(0);
          client.disconnect();
        });
      });
    });

    it.only('publishes to the authorizes device topic', function(done) {
      buildAndConnect(done, function(client) {
        var messageId = Math.floor(65535 * Math.random());

        client.on('puback', function(packet) {
          expect(packet).to.have.property('messageId', messageId);
          client.disconnect();
        });

        client.publish({
          topic: 'devices/' + device.id,
          qos: 0,
          payload: JSON.stringify({ properties: [] }),
          messageId: messageId
        });
      });
    });

    it('can not publish to a not authorized device topic', function(done) {
      done();
    });
  });

  describe('with not valid client ID or secret', function() {

    beforeEach(function() {
      opts.username = 'not-valid';
      opts.password = 'not-valid';
    });

    it('does not connect', function(done) {
      buildClient(done, function(client) {
        client.connect(opts);

        client.on('connack', function(packet) {
          expect(packet.returnCode).to.eql(5);
          client.disconnect();
        });
      });
    });
  });
});
