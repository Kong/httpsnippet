var axios = require('axios').default;

var options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  headers: { accept: 'application/json', 'x-foo': 'Bar' },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });