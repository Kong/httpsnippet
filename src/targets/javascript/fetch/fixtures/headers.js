const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-foo': 'Bar',
    'x-bar': 'Foo',
    'quoted-value': '"quoted" \'string\''
  }
};

fetch('https://httpbin.org/headers', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));