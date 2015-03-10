wget --quiet \
  --method POST \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --body-data "foo=bar&hello=world" \
  --output-document \
  - "http://mockbin.com/har"
