const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  processData: false,
  data: '{"foo":null}'
};

$.ajax(settings).done(res => {
  console.log(res);
});