fetch("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value", {
  "method": "GET",
  "headers": {}
})
.then(response => response.json())
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
