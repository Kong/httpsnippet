const axios = require('axios').default;

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value'
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });