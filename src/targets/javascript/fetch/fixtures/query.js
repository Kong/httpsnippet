const options = {method: 'GET'};

fetch('https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));