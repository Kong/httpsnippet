var axios = require("axios").default;

var { URLSearchParams } = require('url');
var encodedParams = new URLSearchParams();

encodedParams.set('foo', 'bar');

var options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  params: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'},
  headers: {
    cookie: 'foo=bar; bar=baz',
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
