echo '{"foo":null}' |  \
  http POST https://httpbin.org/anything \
  content-type:application/json
