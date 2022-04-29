var axios = require('axios').default;

var options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'Content-Type': 'multipart/form-data'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });