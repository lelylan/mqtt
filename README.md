# MQTT server for Lelylan

MQTT server for Lelylan [Lelylan](http://dev.lelylan.com)


## Requirements

The MQTT node is tested against Node 0.8.8.


## Getting Started

* Clone `git clone git@github.com:lelylan/mqtt.git`
* Run `npm install && npm install -g foreman`
* Run `mongod`
* Run `nf start`

The MQTT server is now listening to the default port `1883`. To learn how to connect a client
to the MQTT Server checkout the [dev center](http://dev.lelylan.com/api/physicals/mqtt).


## Deploy

* `deploy production`


## Resources

* [Mosca](https://github.com/mcollina/mosca)
* [Ascoltatori](https://github.com/mcollina/ascoltatori)
* [Lelylan MQTT docs](http://dev.lelylan.com/api/physicals/docs)
* [Lelylan Physical API](http://dev.lelylan.com/api/physicals)


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.

### Running specs

* Fork and clone the repository
* Run `npm install`
* Run `npm test`


## Coding guidelines

Follow [Felix](http://nodeguide.com/style.html) guidelines.


## Feedback

Use the [issue tracker](http://github.com/lelylan/mqtt/issues) for bugs.
[Mail](mailto:touch@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea
that can improve the project.


## Links

* [GIT Repository](http://github.com/lelylan/mqtt)
* [Mosca](https://github.com/mcollina/mosca)
* [Ascoltatori](https://github.com/mcollina/ascoltatori)
* [Lelylan MQTT docs](http://dev.lelylan.com/api/physicals/docs)
* [Physical API](http://dev.lelylan.com/api/physicals)
* [Lelylan Dev Center](http://dev.lelylan.com)
* [Lelylan Site](http://lelylan.com)


## Authors

[Andrea Reginato](http://twitter.com/andreareginato)


## Contributors

Special thanks to the [following people](https://github.com/lelylan/mqtt/contributors) for
submitting patches.


## Changelog

See [CHANGELOG](mqtt/blob/master/CHANGELOG.md)


## Copyright

Copyright (c) 2013 [Lelylan](http://lelylan.com).
See [LICENSE](mqtt/blob/master/LICENSE.md) for details.
