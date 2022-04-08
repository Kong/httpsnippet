import axios from 'axios';

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: { foo: 'bar', hello: 'world' },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });