import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'Content-Type': 'multipart/form-data'}
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));