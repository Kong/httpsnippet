import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'application/json'},
  data: {
    number: 1,
    string: 'f"oo',
    arr: [1, 2, 3],
    nested: {a: 'b'},
    arr_mix: [1, 'a', {arr_mix_nested: {}}],
    boolean: false
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });