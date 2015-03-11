var request = require("request");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "headers": {
    "Content-Type": "multipart/form-data"
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

