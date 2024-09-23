const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});