'use strict';

var util = require('util');

module.exports = function (opts) {
  var code = [];

  var options = {
    method: this.source.method,
    hostname: this.source.uriObj.hostname,
    port: this.source.uriObj.port,
    path: this.source.uriObj.path,
    headers: this.source.headersObj
  };

  // construct cookies argument
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
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

  if (this.source.postData) {
    code.push(util.format('this.source.write(%s)', JSON.stringify(this.source.postData.text)));
  }

  code.push('this.source.end();');

  return code.join('\n');
};
