const axios = require('axios').default;

const options = {method: 'GET', url: 'http://mockbin.com/har'};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });