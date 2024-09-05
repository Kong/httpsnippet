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
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));