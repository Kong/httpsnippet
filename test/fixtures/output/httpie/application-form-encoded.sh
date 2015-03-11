echo "foo=bar&hello=world" |  \
  http POST http://mockbin.com/har \
  content-type:application/x-www-form-urlencoded
