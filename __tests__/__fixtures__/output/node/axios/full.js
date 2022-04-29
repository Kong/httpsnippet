const axios = require("axios").default;
const { URLSearchParams } = require('url');

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value',
  headers: {
    cookie: 'foo=bar; bar=baz',
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: encodedParams,
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
