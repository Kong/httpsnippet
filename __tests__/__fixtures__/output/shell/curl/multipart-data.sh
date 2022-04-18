curl --request POST \
  --url https://httpbin.org/anything \
  --header 'content-type: multipart/form-data' \
  --form foo=@__tests__/__fixtures__/files/hello.txt \
  --form 'bar=Bonjour le monde'
