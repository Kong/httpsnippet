const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://httpbin.org/anything",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "foo": "bar",
    "hello": "world"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
