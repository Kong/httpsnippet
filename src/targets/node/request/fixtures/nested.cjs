const request = require('request');

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});