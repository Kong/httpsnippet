echo "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--" |  \
  http POST http://mockbin.com/har \
  content-type:multipart/form-data; boundary=---011000010111000001101001
