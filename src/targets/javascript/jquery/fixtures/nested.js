const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value',
  method: 'GET',
  headers: {}
};

$.ajax(settings).done(function (response) {
  console.log(response);
});