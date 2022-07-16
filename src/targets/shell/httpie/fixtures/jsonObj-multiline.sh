echo '{
  "foo": "bar"
}' |  \
  http POST https://httpbin.org/anything \
  content-type:application/json