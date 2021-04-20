var axios = require("axios").default;

var options = {method: 'GET', url: 'https://mockbin.com/har'};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
