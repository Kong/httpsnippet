wget --quiet \
  --method POST \
  --header "content-type: application/json" \
  --body-data "{\"foo\": \"bar\"}" \
  --output-document \
  - "http://mockbin.com/har"
