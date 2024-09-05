const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');

const url = 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    cookie: 'foo=bar; bar=baz'
  },
  body: encodedParams
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));