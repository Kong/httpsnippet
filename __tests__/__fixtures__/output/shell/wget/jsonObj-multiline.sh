wget --quiet \
  --method POST \
  --header 'content-type: application/json' \
  --body-data '{\n  "foo": "bar"\n}' \
  --output-document \
  - https://httpbin.org/anything
