# Lelylan MQTT Server/Broker

## Requirements

The MQTT server/broker is tested against Node 0.10.36


## Getting Started

```bash
$ git clone git@github.com:lelylan/mqtt.git && cd mqtt
$ npm install && npm install -g foreman
$ nf start
```

## Install with docker

#### Badges
Docker image: [lelylanlab/mqtt](https://hub.docker.com/r/lelylanlab/mqtt/)

[![](https://images.microbadger.com/badges/version/lelylanlab/mqtt:latest.svg)](http://microbadger.com/images/lelylanlab/mqtt:latest "Get your own version badge on microbadger.com")  [![](https://images.microbadger.com/badges/image/lelylanlab/mqtt:latest.svg)](http://microbadger.com/images/lelylanlab/mqtt:latest "Get your own image badge on microbadger.com")

### Use docker hub image
```bash
$ docker run -d -it --name mqtt lelylanlab/mqtt
```

### Generate local image
```bash
$ docker build --tag=mqtt .
$ docker run -d -it --name mqtt mqtt
```

When installing the service in production set [lelylan environment variables](https://github.com/lelylan/lelylan/blob/master/README.md#production).


## Resources

* [Lelylan MQTT Documentation](http://dev.lelylan.com/api#api-physical-mqtt)
* [How to Build an High Availability MQTT Cluster for the Internet of Things](https://medium.com/@lelylan/how-to-build-an-high-availability-mqtt-cluster-for-the-internet-of-things-8011a06bd000)


## Contributing

Fork the repo on github and send a pull requests with topic branches.
Do not forget to provide specs to your contribution.


### Running specs

```bash
$ npm install
$ npm test
```

## Coding guidelines

Follow [Felix](http://nodeguide.com/style.html) guidelines.


## Feedback

Use the [issue tracker](http://github.com/lelylan/mqtt/issues) for bugs or [stack overflow](http://stackoverflow.com/questions/tagged/lelylan) for questions.
[Mail](mailto:dev@lelylan.com) or [Tweet](http://twitter.com/lelylan) us for any idea that can improve the project.


## Links

* [GIT Repository](http://github.com/lelylan/mqtt)
* [Lelylan Dev Center](http://dev.lelylan.com)
* [Lelylan Site](http://lelylan.com)


## Authors

[Andrea Reginato](https://www.linkedin.com/in/andreareginato)


## Contributors

Special thanks to all [contributors](https://github.com/lelylan/mqtt/contributors)
for submitting patches.


## Changelog

See [CHANGELOG](https://github.com/lelylan/mqtt/blob/master/CHANGELOG.md)


## License

Lelylan is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
