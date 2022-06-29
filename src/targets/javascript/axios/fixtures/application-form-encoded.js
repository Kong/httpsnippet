import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: encodedParams,
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });