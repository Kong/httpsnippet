const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';

const options = {
  method: 'GET',
  qs: {
    startTime: '2019-06-13T19%3A08%3A25.455Z',
    endTime: '2015-09-15T14%3A00%3A12-04%3A00'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
