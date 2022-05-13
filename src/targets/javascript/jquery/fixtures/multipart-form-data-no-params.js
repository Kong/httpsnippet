const settings = {
  async: true,
  crossDomain: true,
  url: 'http://mockbin.com/har',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});