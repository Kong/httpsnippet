import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything',
  params: {'foo[bar]': 'baz,zap', fiz: 'buz', key: 'value'}
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));