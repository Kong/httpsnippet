var request = require('request');

var options = {
  "url": "http://mockbin.com/har",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "formData": {
    "foo": "bar",
    "hello": "world"
  }
};

request.post(options, function(error, response, body){
  if(error) throw new Error(error);

});

