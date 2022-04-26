const http = require('http');

const options = {
  method: 'PROPFIND',
  hostname: 'mockbin.com',
  port: null,
  path: '/har',
  headers: {}
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

req.end();