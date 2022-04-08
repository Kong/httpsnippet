var axios = require('axios').default;

var options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: { 'content-type': 'application/json' },
  data: { foo: null },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
