import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'application/json'},
  data: {foo: null}
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));