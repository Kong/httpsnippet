'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  code.push('$curl = curl_init();');

  var options = [{
    escape: true,
    name: 'CURLOPT_port',
    value: req.uriObj.port
  }, {
    escape: true,
    name: 'CURLOPT_URL',
    value: req.url
  }, {
    escape: false,
    name: 'CURLOPT_RETURNTRANSFER',
    value: 'true'
  }, {
    escape: false,
    name: 'CURLOPT_HTTP_VERSION',
    value: req.httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1'
  }, {
    escape: true,
    name: 'CURLOPT_CUSTOMREQUEST',
    value: req.method
  }, {
    escape: true,
    name: 'CURLOPT_POSTFIELDS',
    value: req.postData ? req.postData.text : undefined
  }];

  code.push('curl_setopt_array($curl, array(');

  var curlopts = [];

  options.map(function (option) {
    if (option.value) {
      curlopts.push(util.format('%s => %s,', option.name, option.escape ? JSON.stringify(option.value) : option.value));
    }
  });

  // construct cookies
  if (req.cookies && req.cookies.length) {
    var cookies = req.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    curlopts.push(util.format('CURLOPT_COOKIE => "%s",', cookies.join('; ')));
  }

  // construct cookies
  if (req.headers && req.headers.length) {
    var headers = req.headers.map(function (header) {
      return util.format('"%s: %s"', header.name, header.value);
    });

    curlopts.push(util.format('CURLOPT_HTTPHEADER => array(\n\t\t%s\n\t),', headers.join(',\n\t\t')));
  }

  code.push('\t' + curlopts.join('\n\t'));

  code.push('));');
  code.push('$response = curl_exec($curl);');
  code.push('curl_close($curl);');

  return code.join('\n');
};
