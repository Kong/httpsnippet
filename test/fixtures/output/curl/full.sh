curl --request POST \
  --url "http://mockbin.com/har?baz=abc&foo=bar&foo=baz" \
  --header "Accept: application/json" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --cookie "foo=bar; bar=baz" \
  --form "foo=bar"
