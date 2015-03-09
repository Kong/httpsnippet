wget --quiet \
  --method POST \
  --header "Content-Type: application/json" \
  --body-data "{\"foo\": \"bar\"}" \
  --output-document \
  - "http://mockbin.com/har"
