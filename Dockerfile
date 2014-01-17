FROM ubuntu:12.04

RUN mkdir /container
RUN mkdir /container/build
RUN mkdir /container/downloads
RUN mkdir /container/project

# install node
RUN apt-get update
RUN apt-get --yes install bzip2
RUN apt-get --yes install curl
RUN curl --output /container/downloads/node-v0.10.24-linux-x64.tar.gz http://nodejs.org/dist/v0.10.24/node-v0.10.24-linux-x64.tar.gz
RUN tar --extract --verbose --gunzip --file /container/downloads/node-v0.10.24-linux-x64.tar.gz --directory /container/build
ENV NODE_HOME /container/build/node-v0.10.24-linux-x64

# add project code
ADD . /container/project


EXPOSE 8080

WORKDIR /container/project
CMD container/run