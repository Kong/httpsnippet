var request = require('request');

var options = {
  url: 'http://mockbin.com/har?baz=abc&foo=bar&foo=baz',
  formData: {
    "foo": "bar"
  },
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "foo=bar; bar=baz"
  }
}
request.post(options, function(error, response, body) {
  if (error){
    //throw error here
    return;
  }
  // work with response and body here;
});
