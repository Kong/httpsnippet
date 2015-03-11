wget --quiet \
  --method POST \
  --header "accept: application/json" \
  --header "content-type: application/x-www-form-urlencoded" \
  --header "cookie: foo=bar; bar=baz" \
  --body-data "foo=bar" \
  --output-document \
  - "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"
