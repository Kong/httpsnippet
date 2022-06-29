echo '{
  "foo": "bar"
}' |  \
  http POST http://mockbin.com/har \
  content-type:application/json