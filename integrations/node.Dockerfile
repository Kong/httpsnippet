FROM node:18-alpine

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem

# install the integration test certs
RUN apk --no-cache add ca-certificates && \
  rm -rf /var/cache/apk/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates

WORKDIR /src

ADD package.json /src/

# https://www.npmjs.com/package/axios
RUN npm install axios && \
  npm install

ADD . /src
