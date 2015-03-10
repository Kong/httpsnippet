var request = require('request');

var options = {
  "url": "http://mockbin.com/har?baz=abc&foo=bar&foo=baz",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "foo=bar; bar=baz"
  },
  "formData": {
    "foo": "bar"
  }
};

request.post(options, function(error, response, body){
  if(error) throw new Error(error);

});

