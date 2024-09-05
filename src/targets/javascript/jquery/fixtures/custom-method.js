const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything',
  method: 'PROPFIND',
  headers: {}
};

$.ajax(settings).done(res => {
  console.log(res);
});