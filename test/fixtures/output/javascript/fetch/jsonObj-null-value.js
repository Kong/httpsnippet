fetch("http://mockbin.com/har", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "foo": null
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
