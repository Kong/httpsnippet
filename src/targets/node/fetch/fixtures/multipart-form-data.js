const FormData = require('form-data');
const fetch = require('node-fetch');

const formData = new FormData();
formData.append('foo', 'bar');

const url = 'http://mockbin.com/har';
const options = {method: 'POST'};
options.body = formData;

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}