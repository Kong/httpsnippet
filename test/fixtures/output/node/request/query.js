var request = require('request');

request.get('http://mockbin.com/har?key=value&baz=abc&foo=bar&foo=baz', function(error, response, body){
  if(error) throw new Error(error);

});

