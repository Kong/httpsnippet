FROM alpine

ADD . /src
WORKDIR /src

RUN apk update
RUN apk add python3 py3-pip
RUN apk add --update nodejs npm
RUN npm install

# https://docs.python-requests.org/en/latest/
RUN pip install requests
