const options = {method: 'GET'};

fetch('https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));