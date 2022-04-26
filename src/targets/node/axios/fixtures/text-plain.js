var axios = require('axios').default;

var options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'content-type': 'text/plain'},
  data: 'Hello World'
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });