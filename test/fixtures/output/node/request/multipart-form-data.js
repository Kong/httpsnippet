var request = require("request");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "headers": {
    "content-type": "multipart/form-data; boundary=---011000010111000001101001"
  },
  "formData": {
    "foo": {
      "value": "bar"
    }
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

