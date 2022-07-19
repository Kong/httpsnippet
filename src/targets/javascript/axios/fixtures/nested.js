import axios from 'axios';

const options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  params: {'foo[bar]': 'baz,zap', fiz: 'buz', key: 'value'}
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}