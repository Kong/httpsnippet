import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value',
  headers: {
    cookie: 'foo=bar; bar=baz',
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: encodedParams,
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));