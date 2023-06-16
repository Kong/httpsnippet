curl --request POST \
  --url https://httpbin.org/anything \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data-urlencode 'user%20name=John Doe' \
  --data-urlencode '%24filter=by id'