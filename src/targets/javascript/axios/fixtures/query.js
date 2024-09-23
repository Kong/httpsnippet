import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything',
  params: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });