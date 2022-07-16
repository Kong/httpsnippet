const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('GET', 'https://httpbin.org/anything');

xhr.send(data);