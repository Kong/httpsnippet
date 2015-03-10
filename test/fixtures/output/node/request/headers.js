var request = require('request');

var options = {
  url: 'http://mockbin.com/har?',
  headers: {
    "Accept": "application/json",
    "X-Foo": "Bar"
  }
}
request.get(options, function(error, response, body) {
  if (error){
    //throw error here
    return;
  }
  // work with response and body here;
});
