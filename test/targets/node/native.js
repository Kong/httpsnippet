'use strict'

module.exports = function (HTTPSnippet, fixtures) {
  it('should support the insecureSkipVerify option', function () {
    const result = new HTTPSnippet(fixtures.requests.https).convert('node', 'native', {
      insecureSkipVerify: true
    })

    result.should.be.a.String()
    result.should.eql(`const http = require("https");

const options = {
  "method": "GET",
  "hostname": "mockbin.com",
  "port": null,
  "path": "/har",
  "headers": {},
  "rejectUnauthorized": false
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();`)
  })
}
