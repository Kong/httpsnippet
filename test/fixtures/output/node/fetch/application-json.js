const fetch = require('node-fetch');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: {
    number: 1,
    string: 'f"oo',
    arr: [1, 2, 3],
    nested: {a: 'b'},
    arr_mix: [1, 'a', {arr_mix_nested: {}}],
    boolean: false
  },
  json: true
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
