const qs = require('querystring');
const http = require('http');

const options = {
  method: 'POST',
  hostname: 'mockbin.com',
  port: null,
  path: '/har',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({foo: 'bar', hello: 'world'}));
req.end();