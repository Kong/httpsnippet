import fs from 'fs';

const formData = new FormData();
formData.append('foo', await new Response(fs.createReadStream('src/fixtures/files/hello.txt')).blob());

const url = 'https://httpbin.org/anything';
const options = {method: 'POST', body: formData};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));