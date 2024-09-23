import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://httpbin.org/headers',
  headers: {
    accept: 'application/json',
    'x-foo': 'Bar',
    'x-bar': 'Foo',
    'quoted-value': '"quoted" \'string\''
  }
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));