fetch('http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value', {
  "method": "POST",
  "headers": {
    "cookie": "foo=bar; bar=baz",
    "accept": "application/json",
    "content-type": "application/x-www-form-urlencoded"
  },
  "body": {
    "foo": "bar"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
