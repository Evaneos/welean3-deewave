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

RUN sudo add-apt-repository ppa:chris-lea/node.js-devel
RUN apt-get update && apt-get install -y nodejs

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install npm global packages
RUN npm install -g gulp bower

VOLUME ["/weleanit-music"]

EXPOSE 3000

