curl --request POST \
  --url http://mockbin.com/har \
  --header 'content-type: multipart/form-data' \
  --form foo=@hello.txt \
  --form 'bar=Bonjour le monde'