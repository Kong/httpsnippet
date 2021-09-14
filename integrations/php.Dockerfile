FROM composer as builder
WORKDIR /composer/

# https://packagist.org/packages/guzzlehttp/guzzle
RUN composer require guzzlehttp/guzzle

FROM alpine

ADD . /src
WORKDIR /src

RUN apk update
RUN apk add php7 php7-fpm php7-opcache php7-curl
RUN apk add --update nodejs npm
RUN npm install

COPY --from=builder /composer/vendor /src/vendor
