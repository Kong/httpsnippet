const axios = require('axios').default;

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {cookie: 'foo=bar; bar=baz'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });