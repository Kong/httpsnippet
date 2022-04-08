const options = {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: '{"foo":null}',
};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));