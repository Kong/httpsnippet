import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://httpbin.org/cookies',
  headers: {cookie: 'foo=bar; bar=baz'}
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));