import axios from 'axios';

const options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  params: {'foo[bar]': 'baz,zap', fiz: 'buz', key: 'value'}
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });