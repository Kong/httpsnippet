const http = require('http');

const options = {
  method: 'POST',
  hostname: 'mockbin.com',
  port: null,
  path: '/har',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
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

req.write('-----011000010111000001101001\r\nContent-Disposition: form-data; name="foo"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n');
req.end();