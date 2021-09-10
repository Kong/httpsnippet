wget --quiet \
  --method GET \
  --header 'accept: text/json' \
  --header 'x-foo: Bar' \
  --output-document \
  - https://httpbin.org/headers
