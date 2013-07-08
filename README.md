# MQTT server for Lelylan

MQTT server for Lelylan [Lelylan](http://dev.lelylan.com)


## Requirements

The MQTT node is tested against Node 0.8.8.


## Installation

Clone the repository.

    git clone git@github.com:lelylan/mqtt.git

Run Node server.

    foreman start


## Getting Started

* Run `foreman start`
* Open the [server](http://localhost:8004)


## Deploy

Follow [getting started with jitsu](https://www.nodejitsu.com/getting-started/).


## Resources

* [Mosca](https://github.com/mcollina/mosca)
* [Ascoltatori](https://github.com/mcollina/ascoltatori)
* [Physical API](http://dev.lelylan.com/api/physicals)


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.

### Running specs

* Fork and clone the repository
* Run `gem install foreman`
* Run `npm install`
* Run `foreman run mocha test/app_spec.js --env .test.env`


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
