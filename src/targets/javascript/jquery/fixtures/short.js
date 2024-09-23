const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything',
  method: 'GET',
  headers: {}
};

$.ajax(settings).done(res => {
  console.log(res);
});