const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://httpbin.org/headers");
xhr.setRequestHeader("accept", "text/json");
xhr.setRequestHeader("x-foo", "Bar");

xhr.send(data);
