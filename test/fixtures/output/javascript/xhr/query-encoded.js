const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://mockbin.com/har?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00");

xhr.send(data);
