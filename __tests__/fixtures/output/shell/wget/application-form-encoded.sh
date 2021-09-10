wget --quiet \
  --method POST \
  --header 'content-type: application/x-www-form-urlencoded' \
  --body-data 'foo=bar&hello=world' \
  --output-document \
  - https://httpbin.org/anything
