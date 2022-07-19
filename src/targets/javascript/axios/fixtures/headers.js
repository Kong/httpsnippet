import axios from 'axios';

const options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  headers: {accept: 'application/json', 'x-foo': 'Bar', 'x-bar': 'Foo'}
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}