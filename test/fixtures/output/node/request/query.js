var request = require('request');

var options = {
  url: 'http://mockbin.com/har?key=value&baz=abc&foo=bar&foo=baz',
  headers: {}
}
request.get(options, function(error, response, body) {
  if (error){
    //throw error here
    return;
  }
  // work with response and body here;
});
