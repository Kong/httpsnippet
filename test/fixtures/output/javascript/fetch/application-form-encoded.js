fetch("http://mockbin.com/har", {
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "body": {
    "foo": "bar",
    "hello": "world"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
