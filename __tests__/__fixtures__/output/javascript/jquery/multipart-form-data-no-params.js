const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://httpbin.org/anything",
  "method": "POST",
  "headers": {
    "Content-Type": "multipart/form-data"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
