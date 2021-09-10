wget --quiet \
  --method GET \
  --output-document \
  - 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'
