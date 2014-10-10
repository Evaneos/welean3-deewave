FROM phusion/baseimage:latest

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

# Add start script
ADD start.sh /etc/my_init.d/start.sh

# Install.
RUN \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y software-properties-common wget

RUN apt-get install -y make

## NodeJS

RUN sudo add-apt-repository ppa:chris-lea/node.js-devel
RUN apt-get update && apt-get install -y nodejs

## MongoDB

### Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list

### Update apt-get sources AND install MongoDB
RUN apt-get update && apt-get install -y mongodb-org

RUN mkdir -p /data/db

EXPOSE 27017

# Create a runit entry for mongo
RUN mkdir /etc/service/mongo
ADD run_mongo.sh /etc/service/mongo/run

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install npm global packages
RUN npm install -g gulp bower

VOLUME ["/weleanit-music"]

EXPOSE 3000
EXPOSE 22
