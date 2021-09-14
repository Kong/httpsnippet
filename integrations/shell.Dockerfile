FROM alpine

ADD . /src
WORKDIR /src

RUN apk update

RUN apk add curl
RUN apk add --update nodejs npm
RUN npm install
