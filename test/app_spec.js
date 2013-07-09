var Factory = require('factory-lady')
  , Device = require('../app/models/devices/device');

var async = require('async')
  , server = require('../lib/server')
  , mqtt = require('mqtt')
  , ascoltatori = require('ascoltatori')
  , chai = require('chai')
  , expect = require('chai').expect
  , sinon = require('sinon')
  , debug = require('debug')('test');

chai.use(require('sinon-chai'));
chai.use(require('chai-fuzzy'));

require('./factories/devices/device');

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

var portCounter = 30042
  , nextPort = function() {
      settings.port = ++portCounter;
    };


describe('MQTT client',function() {

  beforeEach(function(done) {
    nextPort();
    instance = new server.start(settings);
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

    describe('when publishing', function() {

      it('publishes to the authorizes device topic', function(done) {

        buildAndConnect(done, function(client) {

          var messageId = Math.floor(65535 * Math.random());

          client.on('puback', function(packet) {
            expect(packet).to.have.property('messageId', messageId);
            client.disconnect();
          });

          client.publish({
            qos: 1,
            topic: 'devices/' + device.id,
            payload: JSON.stringify({ properties: [] }),
            messageId: messageId
          });
        });
      });

      it('can not publish to a not authorized device topic', function(done) {

        buildAndConnect(done, function(client) {

          // it exists no negation of auth, it just disconnect the client
          client.publish({
            qos: 1,
            topic: 'devices/not-valid',
            payload: JSON.stringify({ properties: [] }),
            messageId: 42
          });
        });
      });
    });

    describe('when subscribing', function() {

      it('subscribes to the authorized device', function(done) {

        buildAndConnect(done, function(client) {

          var subscriptions = [{ topic: 'devices/' + device.id, qos: 0 }];

          client.on('suback', function(packet) {
            client.disconnect();
          });

          client.subscribe({
            subscriptions: subscriptions,
            messageId: 42
          });
        });
      });

      it('can not subscribe to a not authorized device', function(done) {

        buildAndConnect(done, function(client) {

          var subscriptions = [{ topic: 'devices/not-valid', qos: 0 }];

          // it exists no negation of auth, it just disconnect the client
          client.subscribe({
            subscriptions: subscriptions,
            messageId: 42
          });
        });
      });
    });
  });


  describe('with a not valid client ID or secret', function() {

    beforeEach(function() {
      opts.username = 'not-valid';
      opts.password = 'not-valid';
    });

    it('does not connect', function(done) {
      buildClient(done, function(client) {

        // it exists no negation of auth, it just disconnect the client
        client.connect(opts);
      });
    });
  });
});
