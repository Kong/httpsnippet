fetch("http://mockbin.com/har", {
  "method": "POST",
  "headers": {
    "content-type": "text/plain"
  },
  "body": "Hello World"
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
