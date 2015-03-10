var request = require('request');
var querystring = require("querystring");

var options = {
  url: 'http://mockbin.com/har?',
  body: querystring.stringify({"foo": "bar"}),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
}
request.post(options, function(error, response, body) {
  if (error){
    //throw error here
    return;
  }
  // work with response and body here;
});
