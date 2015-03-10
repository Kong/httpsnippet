var request = require("request");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "headers": {
    "Content-Type": "multipart/form-data"
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

