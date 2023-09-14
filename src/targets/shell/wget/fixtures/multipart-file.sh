wget --quiet \
  --method POST \
  --header 'content-type: multipart/form-data; boundary=---011000010111000001101001' \
  --body-data '-----011000010111000001101001\r\nContent-Disposition: form-data; name="foo"; filename="src/fixtures/files/hello.txt"\r\nContent-Type: text/plain\r\n\r\n\r\n-----011000010111000001101001--' \
  --output-document \
  - https://httpbin.org/anything