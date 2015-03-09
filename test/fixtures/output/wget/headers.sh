wget --quiet \
  --method GET \
  --header "Accept: application/json" \
  --header "X-Foo: Bar" \
  --output-document \
  - "http://mockbin.com/har"
