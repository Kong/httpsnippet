import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  params: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'},
  headers: {
    cookie: 'foo=bar; bar=baz',
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: encodedParams,
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}