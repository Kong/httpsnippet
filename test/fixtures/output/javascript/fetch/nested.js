const options = { method: 'GET' };

fetch('http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
