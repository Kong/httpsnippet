const axios = require('axios').default;

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'application/json'},
  data: {foo: 'bar'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });