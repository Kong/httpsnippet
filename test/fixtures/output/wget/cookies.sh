wget --quiet \
  --method POST \
  --header "Cookie: foo=bar; bar=baz" \
  --output-document \
  - "http://mockbin.com/har"
