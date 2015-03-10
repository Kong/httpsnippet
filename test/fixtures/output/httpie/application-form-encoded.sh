echo "foo=bar&hello=world" |  \
  http POST http://mockbin.com/har \
  Content-Type:application/x-www-form-urlencoded
