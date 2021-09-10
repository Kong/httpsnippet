const data = JSON.stringify({
  "foo": "bar"
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://httpbin.org/anything");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
