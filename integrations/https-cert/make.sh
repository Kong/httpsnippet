#!/usr/bin/env bash

# install https://github.com/FiloSottile/mkcert
mkcert httpbin.org
cp "$(mkcert -CAROOT)"/rootCA.pem .
