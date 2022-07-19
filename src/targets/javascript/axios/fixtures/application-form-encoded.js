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

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}