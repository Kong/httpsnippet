const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://httpbin.org/headers',
  headers: {accept: 'text/json', 'x-foo': 'Bar'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
