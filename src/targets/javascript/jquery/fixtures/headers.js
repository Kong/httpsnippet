const settings = {
  async: true,
  crossDomain: true,
  url: 'http://mockbin.com/har',
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-foo': 'Bar',
    'x-bar': 'Foo'
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
