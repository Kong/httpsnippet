FROM composer as builder
WORKDIR /composer/

# https://packagist.org/packages/guzzlehttp/guzzle
RUN composer require guzzlehttp/guzzle

FROM alpine:3.18

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem
COPY --from=builder /composer/vendor /src/vendor

# install the integration test certs
RUN apk --no-cache add ca-certificates && \
  rm -rf /var/cache/apk/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates

RUN apk update && \
  apk add nodejs npm php81 php81-fpm php81-opcache php81-curl

WORKDIR /src

# add package.json and run npm install so that we only re-do npm install if
# package.json has changed
ADD package.json /src/
RUN npm install

ADD . /src
