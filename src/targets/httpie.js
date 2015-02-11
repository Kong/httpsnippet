'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  if (req.postData) {
    code.push(util.format('echo %s | ', JSON.stringify(req.postData.text)));
  }

  code.push(util.format('http %s %s%s', req.method, req.uriObj.hostname, req.uriObj.pathname));

  // construct query params
  if (req.queryString && req.queryString.length) {
    req.queryString.map(function (query) {
      code.push(util.format('%s==%s', query.name, query.value));
    });
  }

  if (req.headers && req.headers.length) {
    req.headers.map(function (header) {
      code.push(util.format('%s:%s', header.name, header.value));
    });
  }

  if (req.headers && req.headers.length) {
    req.headers.map(function (header) {
      code.push(util.format('%s:%s', header.name, header.value));
    });
  }

  return code.join(' \\\n     ');
};
