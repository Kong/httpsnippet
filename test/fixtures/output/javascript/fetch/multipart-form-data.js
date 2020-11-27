const form = new FormData();
form.append("foo", "bar");

fetch("http://mockbin.com/har", {
  "method": "POST",
  "headers": {
    "Content-Type": "multipart/form-data; boundary=---011000010111000001101001"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
