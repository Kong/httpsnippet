'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  ',
    noTags: false,
    maxRedirects: 10,
    timeout: 30,
    closingTag: false
  }, options);

  var code = [];

  if (!opts.noTags) {
    code.push('<?php');
    code.push('');
  }

  code.push('$curl = curl_init();');
  code.push('');

  var curlOptions = [{
    escape: true,
    name: 'CURLOPT_PORT',
    value: this.source.uriObj.port
  }, {
    escape: true,
    name: 'CURLOPT_URL',
    value: this.source.fullUrl
  }, {
    escape: false,
    name: 'CURLOPT_RETURNTRANSFER',
    value: 'true'
  }, {
    escape: true,
    name: 'CURLOPT_ENCODING',
    value: ''
  }, {
    escape: false,
    name: 'CURLOPT_MAXREDIRS',
    value: opts.maxRedirects
  }, {
    escape: false,
    name: 'CURLOPT_TIMEOUT',
    value: opts.timeout
  }, {
    escape: false,
    name: 'CURLOPT_HTTP_VERSION',
    value: this.source.httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1'
  }, {
    escape: true,
    name: 'CURLOPT_CUSTOMREQUEST',
    value: this.source.method
  }, {
    escape: true,
    name: 'CURLOPT_POSTFIELDS',
    value: this.source.postData ? this.source.postData.text : undefined
  }];

  code.push('curl_setopt_array($curl, array(');

  var curlopts = [];

  curlOptions.map(function (option) {
    if (!~[null, undefined].indexOf(option.value)) {
      curlopts.push(util.format('%s => %s,', option.name, option.escape ? JSON.stringify(option.value) : option.value));
    }
  });

  // construct cookies
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    curlopts.push(util.format('CURLOPT_COOKIE => "%s",', cookies.join('; ')));
  }

  // construct cookies
  if (this.source.headers && this.source.headers.length) {
    var headers = this.source.headers.map(function (header) {
      return util.format('"%s: %s"', header.name, header.value);
    });

    curlopts.push(util.format('CURLOPT_HTTPHEADER => array(\n%s%s%s\n%s),', opts.indent, opts.indent, headers.join(',\n' + opts.indent + opts.indent), opts.indent));
  }

  code.push(opts.indent + curlopts.join('\n' + opts.indent));

  code.push('));');
  code.push('');
  code.push('$response = curl_exec($curl);');
  code.push('');
  code.push('curl_close($curl);');

  if (opts.closingTag) {
    code.push('?>');
  }

  return code.join('\n');
};

module.exports.info = function () {
  return {
    key: 'php',
    ext: '.php',
    title: 'PHP',
    link: 'http://php.net/manual/en/book.curl.php',
    description: 'PHP with libcurl'
  };
};
