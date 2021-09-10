# specify the node base image with your desired version node:<version>
FROM node:14

ADD . /src
WORKDIR /src

RUN apt-get update -qq
RUN apt-get install -qq php7.3 php7.3-curl php7.3-cli
RUN apt-get install -qq --yes python3
