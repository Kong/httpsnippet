import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: encodedParams,
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));