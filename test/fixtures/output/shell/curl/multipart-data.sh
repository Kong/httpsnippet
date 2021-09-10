curl --request POST \
  --url https://httpbin.org/anything \
  --header 'content-type: multipart/form-data' \
  --form foo=@hello.txt
