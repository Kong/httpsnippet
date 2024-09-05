const options = {
  method: 'POST',
  headers: {
    cookie: 'foo=bar; bar=baz',
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({foo: 'bar'})
};

fetch('https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));