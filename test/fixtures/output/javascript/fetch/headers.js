fetch('http://mockbin.com/har', {
  "method": "GET",
  "headers": {
    "accept": "application/json",
    "x-foo": "Bar"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
