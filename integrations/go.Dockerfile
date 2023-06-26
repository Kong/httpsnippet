FROM golang:1.20.5-alpine3.18

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem

# install the integration test certs
RUN apk --no-cache add ca-certificates && \
  rm -rf /var/cache/apk/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates

# XXX: do we eventually need to care about getting an exact version of node
# here? If so, see the csharp container for how to do that
RUN apk update && \
  apk add nodejs npm

WORKDIR /src

# add pacakge.json first so we don't have to `npm install` unless it changes
ADD package.json /src/
RUN npm install

# keep this last so that once this docker image is built it can be used quickly
ADD . /src
