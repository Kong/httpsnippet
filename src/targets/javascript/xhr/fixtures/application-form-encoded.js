const data = 'foo=bar&hello=world';

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'http://mockbin.com/har');
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

xhr.send(data);