const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';
const options = {method: 'POST', headers: {'content-type': 'text/plain'}, body: 'Hello World'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}