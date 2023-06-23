FROM alpine:3.18

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem

# install the integration test cert, curl, and node
RUN apk --no-cache add ca-certificates && \
  rm -rf /var/cache/apk/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates && \
  apk update && \
  apk add curl && \
  apk add --update nodejs npm

WORKDIR /src

# add package.json and run npm install so that we only re-do npm install if
# package.json has changed
ADD package.json /src/
RUN npm install

ADD . /src
