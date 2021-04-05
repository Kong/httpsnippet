fetch("http://mockbin.com/har", {
  "method": "POST",
  "headers": {
    "cookie": "foo=bar; bar=baz"
  }
})
.then(response => response.json())
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
