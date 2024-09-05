const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value',
  method: 'POST',
  headers: {
    cookie: 'foo=bar; bar=baz',
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: {
    foo: 'bar'
  }
};

$.ajax(settings).done(res => {
  console.log(res);
});