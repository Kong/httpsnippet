wget --quiet \
  --method GET \
  --header 'cookie: foo=bar; bar=baz' \
  --output-document \
  - https://httpbin.org/cookies
