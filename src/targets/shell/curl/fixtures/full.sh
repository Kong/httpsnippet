curl --request POST \
  --url 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --cookie 'foo=bar; bar=baz' \
  --data foo=bar