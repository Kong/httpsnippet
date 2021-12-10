FROM composer as builder
WORKDIR /composer/

# https://packagist.org/packages/guzzlehttp/guzzle
RUN composer require guzzlehttp/guzzle

FROM alpine

ADD . /src
WORKDIR /src

RUN apk update
RUN apk add php8 php8-fpm php8-opcache php8-curl
RUN apk add --update nodejs npm
RUN ln /usr/bin/php8 /usr/bin/php
RUN npm install

COPY --from=builder /composer/vendor /src/vendor
