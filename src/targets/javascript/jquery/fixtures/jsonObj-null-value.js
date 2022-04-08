const settings = {
  async: true,
  crossDomain: true,
  url: 'http://mockbin.com/har',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  processData: false,
  data: '{"foo":null}'
};

$.ajax(settings).done(function (response) {
  console.log(response);
});