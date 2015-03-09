wget --quiet \
  --method POST \
  --header "Cookie: foo=bar; bar=baz" \
  --header "Accept: application/json" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --output-document \
  - "http://mockbin.com/har?baz=abc&foo=bar&foo=baz"
