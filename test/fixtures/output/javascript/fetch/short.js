fetch('http://mockbin.com/har', {
  "method": "GET",
  "headers": {}
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
