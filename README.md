# MQTT server for Lelylan

MQTT server for Lelylan [Lelylan](http://dev.lelylan.com)


## Requirements

The MQTT node is tested against Node 0.8.8.


## Getting Started

* Clone `git clone git@github.com:lelylan/mqtt.git`
* Run `npm install && npm install -g foreman`

Before making the server run you need to define a `.env` file containing the needed
environment variables. [Here](https://gist.github.com/andreareginato/5957085) an example.

* Run `nf start`

The MQTT server is now listening to the default port `1883`.


## Authorizations

Lelylan defines [authorizer.js](https://github.com/lelylan/mqtt/blob/master/lib/authorizer.js)
to accept or refuse an MQTT connection.

During the connection phase the client needs to set username and password. For lelylan the
username is the `device id` and the password is the `device secret`. When the credentialas
are not valid, the connection is rejected. Note that if you try to subscribe or publish to a
different device from the one you have authenticated, the connection will be rejected.


## Clients

Follows a client example in Node.js (connect to the local development server).

```javascript
mqtt = require('mqtt');

// MQTT server
var host = 'mqtt.lelylan.com';
var port = '1883';

// Device related info
var device  = { id: '<device-id>', secret: '<device-secret>' }
var topic   = 'devices/' + device.id;
var payload = { properties: [{ id: '<property-id>', value: '<value>' }] };

// MQTT client settings
var opts = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clientId: 'client-' + device.id
}

// MQTT device credentials
opts.username = device.id;
opts.password = device.secret;

// Initial connection to the MQTT server
var client = mqtt.createConnection(1884);

// publish of a message
client.on('connected', function(client) {
  client.connect(opts);

  client.publish({
    qos: 0,
    topic: topic,
    payload: JSON.stringify(payload),
    messageId: Math.floor(65535 * Math.random())
  });
});
```

## Deploy

Follow [deploying  MQTT](#todo).


## Resources

* [Mosca](https://github.com/mcollina/mosca)
* [Ascoltatori](https://github.com/mcollina/ascoltatori)
* [Lelylan Physical API](http://dev.lelylan.com/api/physicals)


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.

### Running specs

* Fork and clone the repository
* Run `npm install`
* Run `npm test`


## Coding guidelines

Follow [github](https://github.com/styleguide/) guidelines.


## Feedback

Use the [issue tracker](http://github.com/lelylan/mqtt/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.


## Links

* [GIT Repository](http://github.com/lelylan/mqtt)
* [Mosca](https://github.com/mcollina/mosca)
* [Ascoltatori](https://github.com/mcollina/ascoltatori)
* [Physical API](http://dev.lelylan.com/api/physicals)
* [Lelylan Dev Center](http://dev.lelylan.com)
* [Lelylan Site](http://lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the [following people](https://github.com/lelylan/mqtt/contributors) for submitting patches.


## Changelog

See [CHANGELOG](mqtt/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](mqtt/blob/master/LICENSE.md) for details.
