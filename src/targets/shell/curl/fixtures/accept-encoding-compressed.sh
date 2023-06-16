curl --request GET \
  --url https://httpbin.org/anything \
  --compressed \
  --header 'accept-encoding: deflate, gzip, br'