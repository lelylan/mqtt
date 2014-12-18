# node image
FROM node:0.10-onbuild

# docker mantainer
MAINTAINER reggie

# add the files to load
ADD ./ .

# install all needed packages
RUN npm install

# expose port
EXPOSE 1883

# execute app.js
ENTRYPOINT ["node", "app.js"]
