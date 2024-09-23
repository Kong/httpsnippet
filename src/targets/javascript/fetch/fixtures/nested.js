const options = {method: 'GET'};

fetch('https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));