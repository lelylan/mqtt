FROM node:0.10
MAINTAINER Federico Gonzalez <https://github.com/fedeg>

RUN apt-get update -qq \
 && apt-get install -y libzmq3 libzmq3-dev build-essential make \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm config set registry http://registry.npmjs.org
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g foreman && npm cache clean
ADD package.json /usr/src/app/
RUN npm install && npm cache clean
ADD . /usr/src/app

EXPOSE 1883

CMD [ "nf", "start" ]
