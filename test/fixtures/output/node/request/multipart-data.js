var request = require("request");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "headers": {
    "content-type": "multipart/form-data; boundary=---011000010111000001101001",
    "content-length": 138
  },
  "formData": {
    "foo": {
      "value": "Hello World",
      "options": {
        "filename": "hello.txt",
        "contentType": "text/plain"
      }
    }
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

