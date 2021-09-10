http --form POST 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' \
  accept:application/json \
  content-type:application/x-www-form-urlencoded \
  cookie:'foo=bar; bar=baz' \
  foo=bar
