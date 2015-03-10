var request = require('request');

var options = {
  "url": "http://mockbin.com/har",
  "headers": {}
};

request.get(options, function(error, response, body){
  if(error) throw new Error(error);

});

