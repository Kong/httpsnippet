const formData = new FormData();
formData.append('foo', 'bar');

const url = 'https://httpbin.org/anything';
const options = {method: 'POST', body: formData};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));