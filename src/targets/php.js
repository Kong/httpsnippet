'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  code.push('$curl = curl_init();');

  var options = [{
    escape: true,
    name: 'CURLOPT_URL',
    value: req.url
  },
  {
    escape: false,
    name: 'CURLOPT_RETURNTRANSFER',
    value: 'true'
  },
  {
    escape: false,
    name: 'CURLOPT_HTTP_VERSION',
    value: req.httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1'
  },{
    escape: true,
    name: 'CURLOPT_CUSTOMREQUEST',
    value: req.method
  },{
    escape: true,
    name: 'CURLOPT_POSTFIELDS',
    value: req.postData ? req.postData.text : undefined
  }];

  options.map(function (option) {
    if (option.value) {
      code.push(util.format('curl_setopt($curl, %s, %s);', option.name, option.escape ? JSON.stringify(option.value) : option.value));
    }
  });


/**
  if (req.cookies && req.cookies.length) {
    var cookies = req.cookies.map(function(cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('-b "%s"', cookies.join('&')));
  }

  if (req.headers && req.headers.length) {
    req.headers.map(function(header) {
      code.push(util.format('-H "%s: %s"', header.name, header.value));
    });
  }

  if (req.postData) {
    code.push(util.format('-d "%s"', req.postData.text));
  }
*/

  return code.join('\n');
}
