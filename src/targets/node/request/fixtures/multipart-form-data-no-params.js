const request = require('request');

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'Content-Type': 'multipart/form-data'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});