const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
