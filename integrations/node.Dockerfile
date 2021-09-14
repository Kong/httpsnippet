FROM node:14

ADD . /src
WORKDIR /src

RUN apt-get update -qq

# https://www.npmjs.com/package/axios
# https://www.npmjs.com/package/request
RUN npm install axios request

# Installing node-fetch@2 because as of 3.0 is't now an ESM-only package.
# https://www.npmjs.com/package/node-fetch
RUN npm install node-fetch@2
