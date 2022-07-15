curl --request POST \
  --url http://mockbin.com/har \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data-urlencode 'user%20name=John Doe' \
  --data-urlencode '%24filter=by id'