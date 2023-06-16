const data = JSON.stringify({
  number: 1,
  string: 'f"oo',
  arr: [
    1,
    2,
    3
  ],
  nested: {
    a: 'b'
  },
  arr_mix: [
    1,
    'a',
    {
      arr_mix_nested: []
    }
  ],
  boolean: false
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://httpbin.org/anything');
xhr.setRequestHeader('content-type', 'application/json');

xhr.send(data);