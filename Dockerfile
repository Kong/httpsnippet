# specify the node base image with your desired version node:<version>
FROM node:8

ADD . /src
WORKDIR /src

RUN apt-get update -qq
RUN apt-get install -qq php7.0 php7.0-curl php7.0-cli
RUN apt-get install -qq --yes python3
