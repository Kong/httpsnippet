fetch("http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value", {
  "method": "GET",
  "headers": {}
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
