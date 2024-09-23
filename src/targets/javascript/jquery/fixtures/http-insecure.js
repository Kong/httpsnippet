const settings = {
  async: true,
  crossDomain: true,
  url: 'http://httpbin.org/anything',
  method: 'GET',
  headers: {}
};

$.ajax(settings).done(res => {
  console.log(res);
});