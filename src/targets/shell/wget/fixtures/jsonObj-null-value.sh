wget --quiet \
  --method POST \
  --header 'content-type: application/json' \
  --body-data '{"foo":null}' \
  --output-document \
  - http://mockbin.com/har