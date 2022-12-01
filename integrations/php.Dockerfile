FROM composer as builder
WORKDIR /composer/

# https://packagist.org/packages/guzzlehttp/guzzle
RUN composer require guzzlehttp/guzzle

FROM alpine:3.16

ADD . /src
WORKDIR /src

RUN apk update
RUN apk add php81 php81-fpm php81-opcache php81-curl
RUN apk add --update nodejs npm
RUN ln /usr/bin/php81 /usr/bin/php
RUN npm install

COPY --from=builder /composer/vendor /src/vendor
