wget --quiet \
  --method POST \
  --header 'content-type: text/plain' \
  --body-data 'Hello World' \
  --output-document \
  - https://httpbin.org/anything