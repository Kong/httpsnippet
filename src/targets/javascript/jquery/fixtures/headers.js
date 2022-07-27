const settings = {
  async: true,
  crossDomain: true,
  url: 'http://mockbin.com/har',
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-foo': 'Bar',
    'quoted-value': '"quoted" \'string\''
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});