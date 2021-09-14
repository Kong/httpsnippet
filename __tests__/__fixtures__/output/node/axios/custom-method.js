const axios = require("axios").default;

const options = {method: 'PROPFIND', url: 'https://httpbin.org/anything'};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
