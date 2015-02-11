'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  var options = {
    method: req.method,
    hostname: req.uriObj.hostname,
    port: req.uriObj.port,
    path: req.uriObj.path,
    headers: req.headersObj
  };

  // construct cookies argument
  if (req.cookies && req.cookies.length) {
    var cookies = req.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    options.headers.Cookie = cookies.join('; ');
  }

  code.push('var options = ' + JSON.stringify(options, null, 2));

  code.push([
    'var req = http.request(options, function (res) {',
    'console.log("STATUS: " + res.statusCode);',
    'console.log("HEADERS: " + JSON.stringify(res.headers));',
    'res.setEncoding("utf8");',
    'res.on("data", function (chunk) {',
    '  console.log("BODY: " + chunk);',
    '});'
  ].join('\n  ') + '\n});');

  if (req.postData) {
    code.push(util.format('req.write(%s)', JSON.stringify(req.postData.text)));
  }

  code.push('req.end();');

  return code.join('\n');
};
