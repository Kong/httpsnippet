var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: {foo: 'bar', hello: 'world'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
