import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));