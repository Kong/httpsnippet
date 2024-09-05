const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  processData: false,
  data: '{\n  "foo": "bar"\n}'
};

$.ajax(settings).done(res => {
  console.log(res);
});