var request = require('request');

var options = {
  url: 'http://mockbin.com/har?',
  body: JSON.stringify({"foo": "bar"}),
  json:true
}
request.post(options, function(error, response, body) {
  if (error){
    //throw error here
    return;
  }
  // work with response and body here;
});
