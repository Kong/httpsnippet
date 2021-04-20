fetch("http://mockbin.com/har", {
  "method": "PROPFIND",
  "headers": {}
})
.then(response => response.json())
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
